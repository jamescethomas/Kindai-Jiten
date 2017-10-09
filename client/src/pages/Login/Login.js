import React, { Component } from 'react';
import LoginForm from 'pages/Login/LoginForm.js';
import UserLogin from 'pages/Login/UserLogin.js';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <LoginForm />
        <UserLogin />
      </div>
    );
  }
}

export default Login;
