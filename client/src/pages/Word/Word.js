import React, { Component } from 'react';
// import L20n from 'react-l20n-u';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from 'App.js';
import WordCard from 'components/Words/Word.js';
import Animation from 'utils/Animation.js';

class Word extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: {}
    };
  }

  componentDidMount() {
    this.getWord(this.props.match.params.word);

  }

  getWord(word) {
    Animation.initFadeAnimation(this.refs.word, true);

    // Get the passwords and store them in state
    fetch('/word/' + word)
      .then(res => res.json())
      .then(body => {
        this.setState((prevState) => {
          return {
            word: body
          }
        });

        Animation.fadeAnimation(this.refs.word);
      });
  }

  render() {
    if (this.state.word.word && this.props.match.params.word !== this.state.word.word) {
      this.getWord(this.props.match.params.word);
      return (<div/>);
    } else {
      return (
        <div className="Word" ref="word">
          <MuiThemeProvider muiTheme={App.myTheme}>
            <WordCard {...this.state.word} />
          </MuiThemeProvider>
        </div>
      );
    }
  }
}

export default Word;
