import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

// Material UI
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//
import App from 'App.js';
import FormHeader from 'components/FormHeader.js';
import ErrorMessage from 'components/ErrorMessage.js';
import GenericDialog from 'components/GenericDialog.js';

import Strings from 'react-l20n-u';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableSubmit: false,

      name: '',
      email: '',
      message: '',

      nameError: '',
      emailError: '',
      messageError: '',
    };

    this.style = {
      maxWidth: 600,
      margin: '20px auto 0',
      padding: 20,
      textAlign: 'right'
    }
  }

  abstractUpdate(value, attr) {
    this.setState((prevState) => {
      var error,
          newState = {};

      if (value.length > 0) {
        error = '';
      } else {
        error = prevState[attr + 'Error'];
      }

      newState[attr] = value;
      newState[attr + 'Error'] = error;

      return newState;
    });
  }

  updateName(component, value) {
    this.abstractUpdate(value, 'name');
  }

  updateEmail(component, value) {
    this.abstractUpdate(value, 'email');
  }

  updateMessage(component, value) {
    this.abstractUpdate(value, 'message');
  }

  validate() {
    var errors = {};

    if (this.state.name.length === 0) {
      errors.nameError = Strings.getRaw('name-error');
    }
    if (this.state.email.length === 0) {
      errors.emailError = Strings.getRaw('email-error');
    }
    if (this.state.message.length === 0) {
      errors.messageError = Strings.getRaw('message-error');
    }

    if (_.isEmpty(errors)) {
      return true;
    } else {
      this.setState((prevState) => {
        return errors;
      });

      return false;
    }
  }

  onSubmitClick() {
    var isValid,
        data = {};

    this.setState((prevState) => {
      return {
        disableSubmit: true
      }
    });

    isValid = this.validate();

    if (isValid) {
      data.name = this.state.name;
      data.email = this.state.email;
      data.message = this.state.message;

      fetch('/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then((response) => {
        if (response.status === 200) {
          this.refs.successDialog.openDialog();
        } else {
          // TODO HANDLE ERROR
          this.refs.errorMessage.openErrorDialog();
        }
      });
    } else {
      this.setState((prevState) => {
        return {
          disableSubmit: false
        }
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={App.myTheme}>
        <div className="definition-form">
          <Paper style={this.style} zDepth={1}>
            <FormHeader
              text={Strings.get('contact')}
              subText={Strings.get('contact-subtext')}
            />
            <br/>

            <TextField
              style={{textAlign: 'left'}}
              floatingLabelText={Strings.get('name')}
              fullWidth={true}
              value={this.state.name}
              onChange={this.updateName.bind(this)}
              errorText={this.state.nameError}
            />
            <br/>

            <TextField
              style={{textAlign: 'left'}}
              floatingLabelText={Strings.get('email')}
              multiLine={true}
              fullWidth={true}
              value={this.state.email}
              onChange={this.updateEmail.bind(this)}
              errorText={this.state.emailError}
            />
            <br/>

            <TextField
              style={{textAlign: 'left'}}
              floatingLabelText={Strings.get('message')}
              multiLine={true}
              fullWidth={true}
              rows={3}
              value={this.state.message}
              onChange={this.updateMessage.bind(this)}
              errorText={this.state.messageError}
            />
            <br/>

            <RaisedButton
              label={Strings.get('send')}
              primary={true}
              disabled={this.state.disableSubmit}
              onClick={this.onSubmitClick.bind(this)}
            />
          </Paper>
          <ErrorMessage ref='errorMessage' />
          <GenericDialog
            ref='successDialog'
            title={Strings.getRaw('contact-success')}
            message={Strings.getRaw('contact-success-message')}
            onCloseCallback={() => { this.props.history.push('/home'); }}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(ContactForm);
