import React, { Component } from 'react';
import Strings from 'react-l20n-u';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDeleteDialog: false
    }
  }

  onEditClick() {

  }

  handleCloseDeleteDialog() {
    this.setState((prevState) => {
      return {
        openDeleteDialog: false
      }
    });
  }

  onDeleteClick() {
    this.setState((prevState) => {
      return {
        openDeleteDialog: true
      }
    });
  }

  deleteComment() {
    var data = {
      wordId: this.props.wordId,
      commentId: this.props.commentId
    };

    fetch('/api/deleteComment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.props.userToken
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(body => {
      this.handleCloseDeleteDialog();

      if (this.props.deleteCommentCallback) {
        this.props.deleteCommentCallback(body);
      } else {
        this.props.history.push('/home');
      }
    });
  }

  render() {
    const style = {
      fontSize: '15px',
      marginTop: '10px'
    }

    const authorStyle = {
      marginRight: '5px'
    }

    const commentStyle = {
      color: 'rgba(0, 0, 0, 0.60)'
    }

    const timestampStyle = {
      textAlign: 'left',
      fontSize: '15px',
      fontStyle: 'italic',
      color: '#ddd'
    }

    const dialogActions = [
      <RaisedButton
        label={Strings.getRaw('cancel')}
        primary={true}
        style={{marginRight: '10px', marginBottom: '10px'}}
        onClick={this.handleCloseDeleteDialog.bind(this)}
      />,
      <RaisedButton
        label={Strings.getRaw('yes')}
        style={{marginRight: '10px', marginBottom: '10px'}}
        onClick={this.deleteComment.bind(this)}
      />,
    ];

    var user = this.props.user,
        userName = '';
    if (user.userName) {
      userName = user.userName;
    } else if (user.firstName && user.lastName) {
      if (this.props.language === 'JP') {
        userName = user.lastName + ' ' + user.firstName;
      } else {
        userName = user.firstName + ' ' + user.lastName;
      }
    } else {
      userName = user.firstName;
    }

    userName = Strings.getRaw('comment-author', {name: userName});

    var date = new Date(this.props.timestamp);

    var options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };
    var format = Strings.getRaw('date-format')

    return(
      <div style={style} className={this.props.className}>
        <span
          style={authorStyle}
          onClick={() => this.props.history.push('/author/' + this.props.user.userid)}
          className="link no-underline comment-name"
        >
          {userName}
        </span>
        <span
          className="comment-text"
          style={commentStyle}
        >
          {this.props.comment}
        </span>
        <div style={timestampStyle} className="timestamp">
          {
            (this.props.loggedIn && this.props.userid === this.props.user.userid) ?
            <span>
              <span
                className="link no-color"
                onClick={this.onEditClick.bind(this)}
              >
                {Strings.get('edit')}
              </span>・
              <span
                className="link no-color"
                onClick={this.onDeleteClick.bind(this)}
              >
                {Strings.get('delete')}
              </span>・
            </span>
            :
            <span/>
          }
          {date.toLocaleDateString(format, options)}
        </div>
        <Dialog
          title={Strings.getRaw('confirm-delete')}
          actions={dialogActions}
          modal={false}
          open={this.state.openDeleteDialog}
          onRequestClose={this.handleCloseDeleteDialog.bind(this)}
        >
          {Strings.get('confirm-delete-comment')}
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps (state) {
  var props = {};

  if (state.user && state.user.loggedIn) {
    props.userToken = state.user.data.token
    props.userid = state.user.data.user.userid;
  }

  props.loggedIn = state.user.loggedIn

  return props;
}

export default withRouter(connect(mapStateToProps, null)(Comment));
