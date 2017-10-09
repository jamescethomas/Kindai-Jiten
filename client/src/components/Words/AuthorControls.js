import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { withRouter } from 'react-router-dom';
import Strings from 'react-l20n-u';

import Line from 'components/Words/Line.js';

class AuthorControls extends Component {
  constructor(props) {
    super(props);

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

  onEditClick() {
    this.props.history.push('/edit/' + this.props.word);
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

    fetch('/api/deleteWord', {
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
    if (this.props.userid && this.props.author && (this.props.author.userid === this.props.userid)) {
      const dialogActions = [
        <RaisedButton
          label={Strings.getRaw('cancel')}
          primary={true}
          style={{marginRight: '10px', marginBottom: '10px'}}
          onClick={this.handleCloseDeleteDialog.bind(this)}
        />,
        <RaisedButton
          label={Strings.getRaw('yes')}
          style={{marginRight: '10px', marginBottom: '10px'}}
          onClick={this.deleteWord.bind(this)}
        />,
      ];

      return(
        <div style={{textAlign: 'right'}}>
          <RaisedButton
            label={Strings.get('edit')}
            style={{marginTop:'10px', marginBottom: '10px', marginRight: '10px'}}
            onClick={this.onEditClick.bind(this)}
          />
          <RaisedButton
            label={Strings.get('delete')}
            style={{marginTop:'10px', marginBottom: '10px'}}
            onClick={this.onDeleteClick.bind(this)}
          />
          <Dialog
            title={Strings.getRaw('confirm-delete')}
            actions={dialogActions}
            modal={false}
            open={this.state.openDeleteDialog}
            onRequestClose={this.handleCloseDeleteDialog.bind(this)}
          >
            {Strings.get('confirm-delete-subheading', { word:this.props.word })}
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
    props.userid = state.user.data.user.userid
  }
  return props;
}

export default withRouter(
  connect(mapStateToProps, null)(AuthorControls)
);
