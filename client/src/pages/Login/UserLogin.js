import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from 'App.js';

// Material UI
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import FormHeader from 'components/FormHeader.js';

// import Strings from 'react-l20n-u';
import * as actions from 'actions/actions.js';

class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: ''
    }
  }

  updateUserName(component, value) {
    this.setState((prevState) => {
      // TODO error messaging
      return {
        userName: value,
      }
    });
  }

  updatePassword(component, value) {
    this.setState((prevState) => {
      // TODO error messaging
      return {
        password: value,
      }
    });
  }

  onSubmitClick() {
    var userData = {
        "email": this.state.userName,
        "password": this.state.password
    };

    fetch('/login', {
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
  };

  render() {
    const style = {
      maxWidth: 600,
      margin: '20px auto 0',
      padding: 20,
      textAlign: 'center'
    }

    return (
      <MuiThemeProvider muiTheme={App.myTheme}>
        <div className="definition-form">
          <Paper style={style} zDepth={1}>
            <FormHeader
              text="Login"
            />

            <TextField
              id="userName"
              style={{textAlign: 'left'}}
              fullWidth={true}
              floatingLabelText="User name"
              value={this.state.userName}
              onChange={this.updateUserName.bind(this)}
            />

            <TextField
              id="password"
              style={{textAlign: 'left'}}
              fullWidth={true}
              floatingLabelText="Password"
              type="password"
              value={this.state.password}
              onChange={this.updatePassword.bind(this)}
            />

            <br/>

            <RaisedButton
              style={{marginTop: '10px'}}
              label="Login"
              primary={true}
              onClick={this.onSubmitClick.bind(this)}
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
  connect(mapStateToProps, mapDispatchToProps)(UserLogin)
);
