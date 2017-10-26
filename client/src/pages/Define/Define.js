import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Custom
import App from 'App.js';
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

  render() {
    return (
      <MuiThemeProvider muiTheme={App.myTheme}>
        <div className="Define" ref="define">
          <DefinitionForm />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Define;
