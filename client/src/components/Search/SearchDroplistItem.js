import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchDroplistItem extends Component {
  onClick() {
    this.props.history.push('/word/' + encodeURI(this.props.word));
    this.props.resetSearch();
  }

  render() {
    const style = {
      paddingLeft: 10,
      paddingRight: 10,
      height: 36,
      lineHeight: '36px',
      overflow: 'hidden',
    }

    const definitionStyle = {
      color: '#000',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      display: 'block',
      paddingLeft: '4px'
    }

    return(
      <div
        style={style}
        className={this.props.highlighted ? "search-droplist-item highlighted" : "search-droplist-item"}
        onClick={this.onClick.bind(this)}
      >
        <span style={{float: 'left'}}>
        {this.props.word}
        </span>
        <span
          className="search-droplist-item-defition"
          style={definitionStyle}
        >- {this.props.definition}</span>
      </div>
    );
  }
}

export default withRouter(SearchDroplistItem);
