import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class WordHeader extends Component {
  onWordClick() {
    this.props.history.push('/word/' + encodeURI(this.props.word));
  }

  render() {
    const style = {
      textAlign: 'left',
      fontSize: '20px',
      cursor: 'pointer',
      display: 'inline-block',
      paddingBottom: '10px',
      color: 'rgb(0, 188, 212)'
    }
    return(
      <div style={style} onClick={this.onWordClick.bind(this)}>
        {this.props.word}
      </div>
    );
  }
}

export default withRouter(WordHeader);
