import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

// Material UI
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Custom
import App from 'App.js';
import ExampleList from './ExampleList.js';
import FormHeader from 'components/FormHeader.js';
import ErrorMessage from 'components/ErrorMessage.js';
import GenericDialog from 'components/GenericDialog.js';

import Strings from 'react-l20n-u';

class DefinitionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableSubmit: false,

      word: '',
      definition: '',
      examples: [
        {
          exampleText: '',
          id: 0
        }
      ],

      wordError: '',
      definitionError: '',
      exampleError: '',
    };

    this.style = {
      maxWidth: 600,
      margin: '20px auto',
      padding: 20,
      textAlign: 'center'
    }
  }

  addExample() {
    this.setState((prevState) => {
      var examples = prevState.examples,
          id = examples[examples.length - 1].id + 1;

      examples.push({
        exampleText: '',
        id: id
      });

      return {
        examples: examples
      }
    });
  }

  removeExample(exampleIdToDelete) {
    this.setState((prevState) => {
      var examples = prevState.examples;

      _.remove(examples, example => example.id === exampleIdToDelete);

      return {
        examples: examples
      }
    });
  }

  updateExample(exampleId, value) {
    this.setState((prevState) => {
      var examples = prevState.examples,
          index = _.findIndex(examples, {id: exampleId}),
          exampleError;

      examples[index].exampleText = value;

      if (value.length > 0) {
        exampleError = '';
      } else {
        exampleError = prevState.exampleError;
      }

      return {
        examples: examples,
        exampleError: exampleError
      };
    });
  }

  updateWord(component, value) {
    this.setState((prevState) => {
      var wordError;

      if (value.length > 0) {
        wordError = '';
      } else {
        wordError = prevState.wordError;
      }

      return {
        word: value,
        wordError: wordError
      }
    });
  }

  updateDefinition(component, value) {
    this.setState((prevState) => {
      var definitionError;

      if (value.length > 0) {
        definitionError = '';
      } else {
        definitionError = prevState.definitionError;
      }

      return {
        definition: value,
        definitionError: definitionError
      }
    });
  }

  onDuplicateLinkClick() {
    this.props.history.push('/word/' + encodeURI(this.state.word));
  }

  onSubmitClick() {
    var wordError = '',
        definitionError = '',
        exampleError = '',
        hasError = false;
    // TODO do some validation
    // TODO If valiation success disable the form

    this.setState((prevState) => {
      return {
        disableSubmit: true
      }
    });

    if (this.state.word === '') {
      hasError = true;
      wordError = Strings.getRaw('word-error');
    }
    if (this.state.definition === '') {
      hasError = true;
      definitionError = Strings.getRaw('definition-error');;
    }
    if (!this.state.examples[0].exampleText) {
      hasError = true;
      exampleError = Strings.getRaw('example-error');;
    }

    if (hasError) {
      this.setState((prevState) => {
        return {
          wordError,
          definitionError,
          exampleError,
          disableSubmit: false
        }
      })
    } else {
      var word = {}
      word.word = this.state.word;
      word.definition = this.state.definition;
      word.examples = this.state.examples;
      word.dateAdded = new Date();
      this.submit(word);
    }
  };

  submit(data) {
    // Associate the user id with the word data if the user is logged in
    if (this.props.user && this.props.user.loggedIn) {
      data.userid = this.props.user.data.user.userid;
    }

    fetch('/addWord', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.status === 201) {
        this.props.history.push('/home');
      } else if (response.status === 409) {
        // Show conflict diloag
        this.refs.conflictDialog.openDialog();
      } else {
        // Show error dialog
        this.refs.errorMessage.openErrorDialog();
      }

      this.setState((prevState) => {
        return {
          disableSubmit: false
        }
      });
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={App.myTheme}>
        <div className="definition-form">
          <Paper style={this.style} zDepth={1}>
            <FormHeader
              text={Strings.get('add-definition')}
            />
            <br/>

            <TextField
              style={{textAlign: 'left'}}
              floatingLabelText={Strings.get('word-or-phrase')}
              fullWidth={true}

              value={this.state.word}
              onChange={this.updateWord.bind(this)}

              errorText={this.state.wordError}
            />
            <br/>

            <TextField
              style={{textAlign: 'left'}}
              floatingLabelText={Strings.get('definition')}
              multiLine={true}
              fullWidth={true}
              rows={3}

              value={this.state.definition}
              onChange={this.updateDefinition.bind(this)}

              errorText={this.state.definitionError}
            />
            <br/>

            <ExampleList
              examples={this.state.examples}
              addExample={this.addExample.bind(this)}
              removeExample={this.removeExample.bind(this)}
              updateExample={this.updateExample.bind(this)}
              errorText={this.state.exampleError}
            />
            <br/>

            <RaisedButton
              label={Strings.get('submit-definition')}
              primary={true}
              onClick={this.onSubmitClick.bind(this)}
              disabled={this.state.disableSubmit}
            />
          </Paper>
          <ErrorMessage ref='errorMessage' />
          <GenericDialog
            ref='conflictDialog'
            title={Strings.getRaw('duplicate-error-title')}
            message={Strings.getRaw('duplicate-error-message')}
            link={this.state.word}
            onLinkClickCallback={this.onDuplicateLinkClick.bind(this)}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default withRouter(
  connect(mapStateToProps, null)(DefinitionForm)
);
