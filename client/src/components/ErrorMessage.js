import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Strings from 'react-l20n-u';

class ErrorMessage extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      openDialog: false
    };
  }

  handleCloseDialog() {
    this.setState((prevState) => {
      return {
        openDialog: false
      }
    });
  }

  openErrorDialog() {
    this.setState((prevState) => {
      return {
        openDialog: true
      }
    });
  }

  render() {
    const dialogActions = [
      <RaisedButton
        label={Strings.get('dismiss')}
        secondary={true}
        style={{marginRight: '10px'}}
        onClick={this.handleCloseDialog.bind(this)}
      />
    ];

    return (
      <div>
        <Dialog
          title={Strings.getRaw('error-title')}
          actions={dialogActions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDialog.bind(this)}
        >
          {Strings.get('error-message')}
        </Dialog>
      </div>
    );
  }
}

export default ErrorMessage;
