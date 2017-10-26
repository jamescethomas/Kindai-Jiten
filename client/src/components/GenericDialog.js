import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Strings from 'react-l20n-u';

class GenericDialog extends Component {
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

    if (this.props.onCloseCallback) {
      this.props.onCloseCallback();
    }
  }

  openDialog() {
    this.setState((prevState) => {
      return {
        openDialog: true
      }
    });
  }

  renderMessage() {
    if (this.props.link) {
      return (
        <span>
          {this.props.message}
          <span
            className="link"
            onClick={this.props.onLinkClickCallback}
          >
          {this.props.link}
          </span>
        </span>
      )
    } else {
      return this.props.message;
    }
  }

  render() {
    const dialogActions = [
      <RaisedButton
        label={Strings.get('dismiss')}
        primary={true}
        style={{marginRight: '10px'}}
        onClick={this.handleCloseDialog.bind(this)}
      />
    ];

    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={dialogActions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDialog.bind(this)}
        >
          {this.renderMessage()}
        </Dialog>
      </div>
    );
  }
}

export default GenericDialog;
