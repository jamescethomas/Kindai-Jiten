import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import EditForm from './EditForm.js';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: null,
      user: null
    }
  }

  componentDidMount() {
    this.getWord();
  }

  getWord() {
    var word = this.props.match.params.word;

    // Get the passwords and store them in state
    fetch('/word/' + word)
      .then(res => res.json())
      .then(body => {
        var word = body;

        if (!word.user || (word.user && word.user.userid !== this.props.user.data.user.userid)) {
          this.props.history.push('/home');
          return;
        }

        this.setState((prevState) => {
          return {
            word: word
          }
        });
        this.refs.EditForm.dataLoaded(word);
      });
  }

  submit(data) {
    // Associate the user id with the word data if the user is logged in
    if (this.props.user && this.props.user.loggedIn) {
      data.userid = this.props.user.data.user.userid;
    }

    data.wordId = this.state.word.wordId;

    fetch('/api/edit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.props.user.data.token
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status !== 202) {
        // Handle error
      }
      return res.json()
    })
    .then((body) => {
      if (body.word)
        this.props.history.push('/word/' + body.word);
    });
  }

  render() {
    return (
      <div className="Define">
        <EditForm
          ref="EditForm"
          word={this.state.word}
          submit={this.submit.bind(this)}
        />
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default withRouter(
  connect(mapStateToProps, null)(Edit)
);
