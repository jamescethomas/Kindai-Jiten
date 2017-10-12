import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

import WordHeader from 'components/Words/WordHeader.js';
import DateAdded from 'components/Words/DateAdded.js';
import Definition from 'components/Words/Definition.js';
import ExampleList from 'components/Words/ExampleList.js';
import Author from 'components/Words/Author.js';
import Line from 'components/Words/Line.js';
import AdminControls from 'components/Words/AdminControls.js';
import AuthorControls from 'components/Words/AuthorControls.js';
import ShareButtons from 'components/ShareButtons.js';
import Like from 'components/Like.js';

class Word extends Component {
  render() {
    const style = {
      width: 600,
      marginTop: 20,
      padding: 20,
      textAlign: 'left',
      display: 'inline-block',
    }

    return(
      <div>
        <Paper style={style} zDepth={1}>
          <WordHeader word={this.props.word} />
          <DateAdded dateAdded={this.props.dateAdded} />
          <Definition definition={this.props.definition} />
          <ExampleList examples={this.props.examples} />
          {this.props.user ?
              <Author user={this.props.user} />
          : <div />}
          <Line/>
          <AdminControls
            word={this.props.word}
            wordId={this.props.wordId}
            deleteWordCallback={this.props.deleteWordCallback}
          />
          <AuthorControls
            word={this.props.word}
            wordId={this.props.wordId}
            author={this.props.user}
            deleteWordCallback={this.props.deleteWordCallback}
          />
          <Like
            wordId={this.props.wordId}
            word={this.props.word}
          />
          <ShareButtons
            word={this.props.word}
          />
        </Paper>
      </div>
    );
  }
}

export default Word;
