import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Strings from 'react-l20n-u';

// Custom
import App from 'App.js';
import Line from 'components/Words/Line.js';

class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      commentError: '',
      disableSubmit: false
    }
  }

  updateComment(component, value) {
    this.setState((prevState) => {
      var commentError;

      if (value.length > 200) {
        commentError = Strings.getRaw('comment-too-long-error');
      } else if (value.length > 0) {
        commentError = '';
      } else {
        commentError = prevState.commentError;
      }

      return {
        comment: value,
        commentError: commentError
      }
    });
  }

  onSubmitClick() {
    var hasError = false,
        commentError = '';

    this.setState((prevState) => {
      return {
        disableSubmit: true
      }
    });

    if (this.state.comment.length === 0) {
      commentError = Strings.getRaw('no-comment-error');
      hasError = true;
    } else if (this.state.commentError.length > 0) {
      hasError = true;
    }

    if (!hasError) {
      var postBody = {
        wordId: this.props.wordId,
        comment: this.state.comment,
        timestamp: new Date()
      };

      // TODO
      // Handle the submit
      fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.props.token
        },
        body: JSON.stringify(postBody)
      })
      .then(res => res.json())
      .then(body => {
        this.props.callback(body);
        this.setState((prevState) => {
          return {
            disableSubmit: false,
            comment: ''
          }
        });
      });
    } else {
      this.setState((prevState) => {
        var newState = {
          disableSubmit: false
        }

        if (commentError.length) {
          newState.commentError = commentError;
        }

        return newState;
      });
    }
  }

  render() {
    if (!this.props.show) {
      return (<div/>);
    }

    const style = {
      marginTop: '10px',
      textAlign: 'right'
    }

    return(
      <MuiThemeProvider muiTheme={App.myTheme}>
        <div style={style} className={"add-comment-" + this.props.wordId}>
          <Line />
          <TextField
            style={{textAlign: 'left'}}
            floatingLabelText={Strings.get('comment')}
            fullWidth={true}
            multiLine={true}
            value={this.state.comment}
            onChange={this.updateComment.bind(this)}

            errorText={this.state.commentError}
          />

          <RaisedButton
            label={Strings.get('add-comment')}
            primary={true}
            onClick={this.onSubmitClick.bind(this)}
            disabled={this.state.disableSubmit}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps (state) {
  var props = {};

  if (state.user && state.user.loggedIn) {
    props.token = state.user.data.token;
  }

  return props;
}

export default connect(mapStateToProps, null)(AddComment);
