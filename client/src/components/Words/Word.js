import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

import WordHeader from 'components/Words/WordHeader.js';
import DateAdded from 'components/Words/DateAdded.js';
import Definition from 'components/Words/Definition.js';
import ExampleList from 'components/Words/ExampleList.js';
import Author from 'components/Words/Author.js';
import Line from 'components/Words/Line.js';
import AdminControls from 'components/Words/AdminControls.js';
import AuthorControls from 'components/Words/AuthorControls.js';
import ShareButtons from 'components/ShareButtons.js';
import Like from 'components/Like.js';
import CommentButton from 'components/Comment/CommentButton.js';
import CommentList from 'components/Comment/CommentList.js';
import AddComment from 'components/Comment/AddComment.js';
import Scrolling from 'utils/Scrolling.js';

class Word extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addingComment: false,
      displayAllComments: false,
      fetchedComments: false,
      totalComments: 0,
      comments: []
    }
  }

  fetchComments() {
    fetch('/comments?wordId=' + this.props.wordId)
    .then(res => res.json())
    .then(body => {
      this.setState((prevState) => {
        var data = {};

        data.fetchedComments = true;
        if (body.totalComments) {
          data.totalComments = body.totalComments;
        }
        if (body.comments) {
          data.comments = body.comments;
        }

        return data;
      });
    });
  }

  onAddCommentClick() {
    this.setState((prevState) => {
      return {
        addingComment: !prevState.addingComment
      }
    });
  }

  onCommentAdded(commentData) {
    this.setState((prevState) => {
      var data = {};

      if (commentData.totalComments) {
        data.totalComments = commentData.totalComments;
      }
      if (commentData.comments) {
        data.comments = commentData.comments;
      }
      data.displayAllComments = true;
      data.addingComment = false;

      return data;
    });

    Scrolling.scrollToElement(this.refs.comments.getLastCommentElem());
  }

  onCommentDeleted(commentData) {
    this.setState((prevState) => {
      var data = {};

      if (commentData.totalComments) {
        data.totalComments = commentData.totalComments;
      }
      if (commentData.comments) {
        data.comments = commentData.comments;
      }

      return data;
    });
  }

  render() {
    if (this.props.wordId >= 0 && !this.state.fetchedComments) {
      this.fetchComments();
    }

    const style = {
      maxWidth: 600,
      margin: '20px auto',
      padding: 20,
      textAlign: 'left'
    }

    return(
      <div>
        <Paper style={style} zDepth={1}>
          <WordHeader word={this.props.word} />
          <DateAdded dateAdded={this.props.dateAdded} />
          <Definition definition={this.props.definition} />
          <ExampleList examples={this.props.examples} />
          {this.props.user ?
              <Author user={this.props.user} />
          : <div />}
          <Line/>
          <AdminControls
            word={this.props.word}
            wordId={this.props.wordId}
            deleteWordCallback={this.props.deleteWordCallback}
          />
          <AuthorControls
            word={this.props.word}
            wordId={this.props.wordId}
            author={this.props.user}
            deleteWordCallback={this.props.deleteWordCallback}
          />
          <Like
            wordId={this.props.wordId}
            word={this.props.word}
          />
          <CommentButton
            addCommentCallback={this.onAddCommentClick.bind(this)}
          />
          <ShareButtons
            word={this.props.word}
          />
          <CommentList
            ref="comments"
            displayAll={this.state.displayAllComments}
            comments={this.state.comments}
            addCommentCallback={this.onAddCommentClick.bind(this)}
            wordId={this.props.wordId}
            deleteCommentCallback={this.onCommentDeleted.bind(this)}
          />
          <AddComment
            ref="addComment"
            callback={this.onCommentAdded.bind(this)}
            show={this.state.addingComment}
            wordId={this.props.wordId}
          />
         </Paper>
      </div>
    );
  }
}

export default Word;
