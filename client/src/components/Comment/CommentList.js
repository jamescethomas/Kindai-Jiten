import React, { Component } from 'react';
import Comment from 'components/Comment/Comment.js';
import Strings from 'react-l20n-u';

import Line from 'components/Words/Line.js';

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentsDisplayed: 3
    }
  }

  getLastCommentElem() {
    return document.querySelector('.last-comment');
  }

  renderComments() {
    var comments = [];

    for (var i = 0; (this.props.displayAll || i < this.state.commentsDisplayed) && i < this.props.comments.length; i++) {
      if ((i === this.props.comments.length - 1) || (!this.props.displayAll && (i === this.state.commentsDisplayed -1))) {
        comments.push(
          <Comment
            key={i}
            className="last-comment"
            deleteCommentCallback={this.props.deleteCommentCallback}
            wordId={this.props.wordId}
            {...this.props.comments[i]}
          />
        );
      } else {
        comments.push(
          <Comment
            key={i}
            className=""
            deleteCommentCallback={this.props.deleteCommentCallback}
            wordId={this.props.wordId}
            {...this.props.comments[i]}
          />
        );
      }
    }

    return (
      <div>
        {comments}
      </div>
    )
  }

  render() {
    const style = {
      marginTop: '10px'
    }

    const seeMoreStyle = {
      marginTop: '10px',
      fontSize: '15px'
    }

    return (
      <div style={style}>
        <Line/>
        {
          this.renderComments()
        }
        {
          ((this.props.comments.length > this.state.commentsDisplayed) && (!this.props.displayAll)) ?
          <div
            onClick={() => this.setState((prevState) => { return { commentsDisplayed: prevState.commentsDisplayed + 3 }})}
            style={seeMoreStyle}
            className="link no-color no-underline"
          >
            {Strings.get('see-more-comments')}
          </div>
          :
          <div/>
        }
        {
          (this.state.commentsDisplayed > 4) ?
          <div
            onClick={() => { this.props.addCommentCallback() }}
            style={seeMoreStyle}
            className="link no-color no-underline"
          >
            {Strings.get('add-comment')}
          </div>
          :
          <div />
        }
      </div>
    );
  }
}

export default CommentList;
