import React, { Component } from 'react';
import SearchDroplistItem from 'components/Search/SearchDroplistItem.js';

class SearchDroplist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlightedIndex: null,
    }
  }

  onDownKey() {
    this.setState((prevState) => {
      var newHighlightedIndex;

      if (prevState.highlightedIndex === null) {
        newHighlightedIndex = 0
      } else if ((prevState.highlightedIndex + 2) > this.props.words.length) {
        newHighlightedIndex = null;
      } else {
        newHighlightedIndex = prevState.highlightedIndex + 1;
      }

      return {
        highlightedIndex: newHighlightedIndex
      }
    });
  }

  onUpKey() {
    this.setState((prevState) => {
      var newHighlightedIndex;

      if (prevState.highlightedIndex === null) {
        newHighlightedIndex = this.props.words.length - 1;
      } else if ((prevState.highlightedIndex - 1) < 0) {
        newHighlightedIndex = null;
      } else {
        newHighlightedIndex = prevState.highlightedIndex - 1;
      }

      return {
        highlightedIndex: newHighlightedIndex
      }
    });
  }

  onEnterKey() {
    var index = this.state.highlightedIndex;

    if (index !== null && this.props.words && this.props.words[index]) {
      this.props.history.push('/word/' + encodeURI(this.props.words[index].word));
      this.props.resetSearch();
    }
  }

  renderItems() {
    return (
      <div>
        {this.props.words.map((word, index) => (
          <SearchDroplistItem
            key={index}
            {...word}
            resetSearch={this.props.resetSearch}
            highlighted={(index === this.state.highlightedIndex)}
          />
        ))}
      </div>
    );
  }

  render() {
    const style = {
      backgroundColor: '#FFF',
      position: 'absolute',
      display: 'inline',
      left: '10px',
      top: '48px',
      border: '1px solid #00869a',
      borderRadius: '0px',
      borderTop: 'none',
      width: 'calc(100% - 9px)',
      boxShadow: '0px 3px 8px rgba(0,0,0,0.12)'
    };

    const lineStle = {
      width: '100%',
      height: '8px',
      backgroundColor: '#00869a',
    }

    return(
      <div style={style} onMouseEnter={this.props.mouseIn} onMouseLeave={this.props.mouseOut}>
        <div style={lineStle} />
        {
          this.renderItems()
        }
      </div>
    );
  }
}

export default SearchDroplist;
