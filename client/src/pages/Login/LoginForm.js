import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Strings from 'react-l20n-u';
import FacebookLogin from 'react-facebook-login';

// Material UI
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Custom
import * as actions from 'actions/actions.js';
import App from 'App.js';
import FormHeader from 'components/FormHeader.js';

class LoginForm extends Component {
  facebookAuthCallback(data) {
    var userData = {
        "firstName": data.first_name,
        "lastName": data.last_name,
        "email": data.email,
        "fb_id": data.id,
        "fb_token": data.accessToken
    };

    fetch('/createNewUserFB', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(body => {
      // Save the user data is redux + cookies
      this.props.actions.loginUser(body);

      // Navigate to the home page for now TODO profile?
      this.props.history.push('/home');
    });

    // TODO
    // error(function (data, status, headers, config) {
    //     callback(status);
    // });
  }

  render() {
    const style = {
      width: 600,
      marginTop: 20,
      padding: 20,
      textAlign: 'center',
      display: 'inline-block'
    }

    return (
      <MuiThemeProvider muiTheme={App.myTheme}>
        <div className="definition-form">
          <Paper style={style} zDepth={1}>
            <FormHeader
              text={Strings.get('login-message')}
            />
            <FacebookLogin
             appId="916053341770476"
             autoLoad={false}
             fields="email,picture,first_name,last_name,birthday"
             callback={this.facebookAuthCallback.bind(this)}
            />
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    	actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
