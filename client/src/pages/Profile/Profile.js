import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Strings from 'react-l20n-u';

// UI
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from 'actions/actions.js';

// Custom
import FormHeader from 'components/FormHeader.js';
import Link from 'components/Link.js';
import App from 'App.js';
import Animation from 'utils/Animation.js';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initUserName: '',
      userName: '',
      userNameError: ''
    }
  }

  componentDidMount() {
    Animation.initFadeAnimation(this.refs.profile);

    if (!this.props.user || !this.props.user.loggedIn) {
      this.props.history.push('/home');
    } else {
      var user = this.props.user.data.user,
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

      this.setState((prevState) => {
        return {
          initUserName: userName,
          userName: userName
        }
      });
    }

    Animation.fadeAnimation(this.refs.profile);
  }

  updateUserName(component, value) {
    this.setState((prevState) => {
      var userNameError;

      if (value.length > 0) {
        userNameError = '';
      } else {
        userNameError = prevState.userNameError;
      }

      return {
        userName: value,
        userNameError: userNameError
      }
    });
  }

  onSubmitClick() {
    var userNameError = '',
        hasError = false;

    if (this.state.userName === '') {
      hasError = true;
      userNameError = Strings.getRaw('user-name-error-empty');
    } else if (this.state.userName === this.state.initUserName) {
      hasError = true;
      userNameError = Strings.getRaw('user-name-error-no-change');
    } else if (this.state.userName.length > 50) {
      hasError = true;
      userNameError = Strings.getRaw('user-name-error-too-long');
    }

    if (hasError) {
      this.setState((prevState) => {
        return {
          userNameError,
        }
      })
    } else {
      var userData = {}
      userData.userName = this.state.userName;

      fetch('/api/updateUserName', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.props.user.data.token
        },
        body: JSON.stringify(userData)
      })
      .then(res => res.json())
      .then((body) => {
        this.props.actions.updateUser(body.userName);
      });
    }
  }

  render() {
    const style = {
      maxWidth: 600,
      margin: '20px auto 0',
      padding: 20,
      textAlign: 'right'
    }

    const linkStlye = {
      maxWidth: 600,
      margin: '20px auto 0',
      padding: 20,
      textAlign: 'left',
      fontSize: '16px'
    }

    return (
      <div style={{textAlign: 'center'}} ref="profile">
        <MuiThemeProvider muiTheme={App.myTheme}>
          <div>
            <div>
              <Paper style={style}>
                <FormHeader
                  text={Strings.get('profile')}
                />
                <br/>

                <TextField
                  id="userName"
                  style={{textAlign: 'left'}}
                  fullWidth={true}
                  floatingLabelText={Strings.get('edit-user-name')}
                  value={this.state.userName}
                  onChange={this.updateUserName.bind(this)}

                  errorText={this.state.userNameError}
                />

                <br/>

                <RaisedButton
                  style={{marginTop: '10px'}}
                  label={Strings.get('save')}
                  primary={true}
                  onClick={this.onSubmitClick.bind(this)}
                />
              </Paper>
            </div>
            <div>
              <Paper　style={linkStlye}>
                <Link
                  text={Strings.get('my-words')}
                  href={'/author/' + this.props.user.data.user.userid}
                />
              </Paper>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  var props = {};
  if (state.user.data.user) {
    props.user = state.user
  }

  props.language = state.language;

  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    	actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
