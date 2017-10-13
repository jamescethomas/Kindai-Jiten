import React, { Component } from 'react';
import LoginForm from 'pages/Login/LoginForm.js';
import UserLogin from 'pages/Login/UserLogin.js';
import Animation from 'utils/Animation.js';

class Login extends Component {
  componentDidMount() {
    Animation.initFadeAnimation(this.refs.login);
    Animation.fadeAnimation(this.refs.login);
  }

  render() {
    return (
      <div className="Login" ref="login">
        <LoginForm />
        <UserLogin />
      </div>
    );
  }
}

export default Login;
