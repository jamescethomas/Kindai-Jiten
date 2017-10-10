import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { withRouter } from 'react-router-dom';
import Strings from 'react-l20n-u';

class Like extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likeCount: 0,
      dislikeCount: 0,
      liked: false,
      disliked: false
    }
  }

  onLikeClick() {
    var likeCount,
        dislikeCount;

    if (!this.props.loggedIn) {
      this.props.history.push('/login');
      return;
    }

    if (this.state.disliked) {
      dislikeCount = this.state.dislikeCount - 1
    } else {
      dislikeCount = this.state.dislikeCount;
    }

    if (!this.state.liked) {
      likeCount = this.state.likeCount + 1;
    } else {
      return;
    }

    this.setState((prevState) => {
      return {
        likeCount: likeCount,
        dislikeCount: dislikeCount,
        liked: true,
        disliked: false,
      }
    });

    // API Call to like
    this.props.likeCallback();
  }

  onDislikedClick() {
    var likeCount,
        dislikeCount;

    if (!this.props.loggedIn) {
      this.props.history.push('/login');
      return;
    }

    if (this.state.liked) {
      likeCount = this.state.likeCount - 1
    } else {
      likeCount = this.state.likeCount;
    }

    if (!this.state.disliked) {
      dislikeCount = this.state.dislikeCount + 1;
    } else {
      return;
    }

    this.setState((prevState) => {
      return {
        likeCount: likeCount,
        dislikeCount: dislikeCount,
        liked: false,
        disliked: true
      }
    });

    // API Call to dislike
    this.props.dislikeCallback();
  }

  render() {
    const style = {
      marginTop: '14px',
      float: 'left',
      fontSize: '12px'
    }

    const iconStyle = {
      marginRight: '5px',
      marginLeft: '5px'
    }

    const selectedStyle = {
      color: 'rgb(255, 64, 129)'
    }

    return (
      <span style={style}>
        <span className="like">
          <span>
            {this.state.likeCount}
          </span>
          <span
            style={(this.state.liked) ? selectedStyle : {}}
            className="like-button"
            onClick={this.onLikeClick.bind(this)}
          >
            <FontAwesome style={iconStyle} name='heart-o'/>
            <span className="message">
              {Strings.get('like')}
            </span>
          </span>
        </span>
        <span className="dislike">
          <span>
            {this.state.dislikeCount}
          </span>
          <span
            style={(this.state.disliked) ? selectedStyle : {}}
            className="dislike-button"
            onClick={this.onDislikedClick.bind(this)}
          >
            <FontAwesome style={iconStyle} name='frown-o'/>
            <span className="message">
              {Strings.get('dislike')}
            </span>
          </span>
        </span>
      </span>
    );
  }
}

function mapStateToProps (state) {
  return {
    loggedIn: state.user.loggedIn,
  }
}

export default withRouter(connect(mapStateToProps, null)(Like));
