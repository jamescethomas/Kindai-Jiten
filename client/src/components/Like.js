import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { withRouter } from 'react-router-dom';
import Strings from 'react-l20n-u';
import _ from 'lodash';

class Like extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likeCount: 0,
      dislikeCount: 0,
      liked: false,
      disliked: false,
      wordId: null
    }
  }

  componentDidMount() {
    if (this.props.wordId) {
      this.fetchLikes();
    }
  }

  fetchLikes() {
    var wordId = this.props.wordId;

    fetch('/likes?wordId=' + this.props.wordId)
    .then((res) => res.json())
    .then((body) => {
      this.updateAfterFetch(body, wordId);
    });
  }

  updateAfterFetch(body, wordId) {
    if (_.isEmpty(body)) {
      body.totalLikes = 0;
      body.totalDislikes = 0;
      body.likes = {};
      body.dislikes = {};
    }

    this.setState((prevState) => {
      var hasLiked = (this.props.userid && body.likes[this.props.userid]),
          hasDisliked = (this.props.userid && body.dislikes[this.props.userid]);


      return {
        likeCount: body.totalLikes,
        dislikeCount: body.totalDislikes,
        liked: hasLiked,
        disliked: hasDisliked,
        wordId: wordId
      }
    });
  }

  /**
   * Like or dislike a word
   */
  like(userid) {
    this.handleLikeDislike(true, {
      token: this.props.token,
      wordId: this.props.wordId
    });
  }

  dislike(userid) {
    this.handleLikeDislike(false, {
      token: this.props.token,
      wordId: this.props.wordId
    });
  }

  handleLikeDislike(like, data) {
    var postBody = {
      wordId: data.wordId
    },
      wordId = data.wordId;

    if (like) {
      postBody.like = true;
    } else {
      postBody.dislike = true;
    }

    fetch('/api/like', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': data.token
      },
      body: JSON.stringify(postBody)
    })
    .then(res => res.json())
    .then(body => {
      this.updateAfterFetch(body, wordId);
    });
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
    this.like();
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
    this.dislike();
  }

  render() {
    if (this.props.wordId && this.state.wordId !== this.props.wordId) {
      this.fetchLikes();
      return(<div/>);
    }

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
            style={(this.state.liked && this.props.loggedIn) ? selectedStyle : {}}
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
            style={(this.state.disliked && this.props.loggedIn) ? selectedStyle : {}}
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
  var props = {};

  if (state.user && state.user.loggedIn) {
    props.token = state.user.data.token;
    props.userid = state.user.data.user.userid;
  }

  props.loggedIn = state.user.loggedIn

  return props;
}


export default withRouter(connect(mapStateToProps, null)(Like));
