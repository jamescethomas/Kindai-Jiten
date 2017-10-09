import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Custom
import DefinitionForm from './DefinitionForm.js';

class Define extends Component {
  submit(data) {
    // Associate the user id with the word data if the user is logged in
    if (this.props.user && this.props.user.loggedIn) {
      data.userid = this.props.user.data.user.userid;
    }

    fetch('/addWord', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.status === 201) {
        this.props.history.push('/home');
      } else {
        // TODO HANDLE ERROR
      }
    });
  }

  render() {
    return (
      <div className="Define">
        <DefinitionForm submit={this.submit.bind(this)}/>
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
  connect(mapStateToProps, null)(Define)
);
