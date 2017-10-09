import React, { Component } from 'react';

import Word from 'components/Words/Word.js';

class WordsList extends Component {
  renderWords() {
    return (
      <div>
        {this.props.words.map((word, index) => (
          <Word
            key={index}
            deleteWordCallback={this.props.deleteWordCallback}
            {...word}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {
          this.renderWords()
        }
      </div>
    );
  }
}

export default WordsList;
