import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Custom
import DefinitionForm from './DefinitionForm.js';

class Define extends Component {
  componentDidMount() {
  	// Get the components DOM node
  	var elem = this.refs.define;
  	// Set the opacity of the element to 0
  	elem.style.opacity = 0;
  	window.requestAnimationFrame(function() {
  		// Now set a transition on the opacity
  		elem.style.transition = "opacity 500ms";
      elem.style.webkitTransition = "opacity 500ms";
  		// and set the opacity to 1
  		elem.style.opacity = 1;
  	});
  }

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
      <div className="Define" ref="define">
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
