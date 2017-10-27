import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Strings from 'react-l20n-u';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CommentButton extends Component {
  onAddCommentClick() {
    if (this.props.loggedIn) {
      this.props.addCommentCallback();
    } else {
      this.props.history.push('/login');
    }
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

    return(
      <span style={style}>
        <span className="comment">
          <span
            className="comment-button"
            onClick={this.onAddCommentClick.bind(this)}
          >
            <FontAwesome style={iconStyle} name='comment-o'/>
            <span className="message">
              {Strings.get('add-comment')}
            </span>
          </span>
        </span>
      </span>
    );
  }
}

function mapStateToProps (state) {
  var props = {};

  props.loggedIn = state.user.loggedIn

  return props;
}

export default withRouter(connect(mapStateToProps, null)(CommentButton));
