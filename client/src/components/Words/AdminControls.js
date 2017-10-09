import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { withRouter } from 'react-router-dom';

import Line from 'components/Words/Line.js';

class AdminControls extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      openDeleteDialog: false
    };
  }

  handleCloseDeleteDialog() {
    this.setState((prevState) => {
      return {
        openDeleteDialog: false
      }
    });
  }

  onDeleteClick() {
    this.setState((prevState) => {
      return {
        openDeleteDialog: true
      }
    });
  }

  deleteWord() {
    var data = {
      wordId: this.props.wordId
    };

    fetch('/api/admin/deleteWord', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.props.userToken
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(body => {
      this.handleCloseDeleteDialog();

      if (this.props.deleteWordCallback) {
        this.props.deleteWordCallback();
      } else {
        this.props.history.push('/home');
      }
    });
  }

  render() {
    if (this.props.userRole === 'admin') {
      const dialogActions = [
        <RaisedButton
          label="Cancel"
          primary={true}
          style={{marginRight: '10px'}}
          onClick={this.handleCloseDeleteDialog.bind(this)}
        />,
        <RaisedButton
          label="Yes"
          onClick={this.deleteWord.bind(this)}
        />,
      ];

      return(
        <div>
          <RaisedButton
            secondary={true}
            label="Delete"
            style={{marginTop:'10px', marginBottom: '10px'}}
            onClick={this.onDeleteClick.bind(this)}
          />
          <Dialog
            title="Confirm delete"
            actions={dialogActions}
            modal={false}
            open={this.state.openDeleteDialog}
            onRequestClose={this.handleCloseDeleteDialog.bind(this)}
          >
            {"Are you sure you want to delete '" + this.props.word + "'"}
          </Dialog>
          <Line/>
        </div>
      );
    } else {
      return(<div/>);
    }
  }
}

function mapStateToProps (state) {
  var props = {};
  if (state.user.data.user) {
    props.userToken = state.user.data.token
    props.userRole = state.user.data.user.role
  }
  return props;
}

export default withRouter(
  connect(mapStateToProps, null)(AdminControls)
);
