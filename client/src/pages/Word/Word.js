import React, { Component } from 'react';
// import L20n from 'react-l20n-u';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from 'App.js';
import WordCard from 'components/Words/Word.js';

class Word extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: {}
    };
  }

  getWord(word) {
    // Get the passwords and store them in state
    fetch('/word/' + word)
      .then(res => res.json())
      .then(body => {
        this.setState((prevState) => {
          return {
            word: body
          }
        });
      });
  }

  render() {
    if (this.props.match.params.word !== this.state.word.word) {
      this.getWord(this.props.match.params.word);
      return (<div/>);
    } else {
      return (
        <div className="Word">
          <MuiThemeProvider muiTheme={App.myTheme}>
            <WordCard {...this.state.word} />
          </MuiThemeProvider>
        </div>
      );
    }
  }
}

export default Word;
