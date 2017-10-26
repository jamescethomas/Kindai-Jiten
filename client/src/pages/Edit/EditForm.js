import React, { Component } from 'react';
import _ from 'lodash';

// Material UI
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//
import App from 'App.js';
import ExampleList from 'pages/Define/ExampleList.js';
import FormHeader from 'components/FormHeader.js';

import Strings from 'react-l20n-u';

class EditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      margin: '20px auto 0',
      padding: 20,
      textAlign: 'center'
    }
  }

  dataLoaded(word) {
    this.updateWord({}, word.word);
    this.updateDefinition({}, word.definition);
    console.log(word);
    this.updateExample(0, word.examples[0].exampleText);
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

  onSubmitClick() {
    var wordError = '',
        definitionError = '',
        exampleError = '',
        hasError = false;
    // TODO do some validation
    // TODO If valiation success disable the form

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
          exampleError
        }
      })
    } else {
      var word = {}
      word.word = this.state.word;
      word.definition = this.state.definition;
      word.examples = this.state.examples;
      word.editDate = new Date();
      this.props.submit(word);
    }
  };

  onCancelClick() {
    this.props.cancel();
  }

  render() {
    const buttonStyle = {
      marginRight: '10px'
    }

    return (
      <MuiThemeProvider muiTheme={App.myTheme}>
        <div className="definition-form">
          <Paper style={this.style} zDepth={1}>
            <FormHeader
              text={Strings.get('edit-definition', {word:this.state.word})}
            />
            <br/>

            <TextField
              style={{textAlign: 'left'}}
              floatingLabelText={Strings.get('word-or-phrase')}
              floatingLabelFixed={true}
              fullWidth={true}

              value={this.state.word}
              onChange={this.updateWord.bind(this)}

              errorText={this.state.wordError}
            />
            <br/>

            <TextField
              style={{textAlign: 'left'}}
              floatingLabelText={Strings.get('definition')}
              floatingLabelFixed={true}
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
              floatingLabelFixed={true}
            />
            <br/>

            <RaisedButton
              style={buttonStyle}
              label={Strings.get('save')}
              primary={true}
              onClick={this.onSubmitClick.bind(this)}
            />

            <RaisedButton
              label={Strings.get('cancel')}
              primary={false}
              onClick={this.onCancelClick.bind(this)}
            />
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default EditForm;
