import React, { Component } from 'react';
import SearchDroplist from 'components/Search/SearchDroplist.js';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      showDroplist: false,
      hasResults: false,
      searchDroplistHover: false,
      words: [],
      composing: false
    }
  }

  resetSearch() {
    this.setState((prevState) => {
      return {
        search: '',
        showDroplist: false,
        hasResults: false,
        searchDroplistHover: false,
        words: [],
        composing: false
      }
    });
  }

  onInputChange(event) {
    var value = event.target.value;

    this.setState((prevState) => {
      return {
        search: value
      }
    });

    if (value.length && _.trim(value).length) {
      fetch('/searchWords?searchTerm=' + value)
        .then(res => res.json())
        .then(body => {
          this.setState((prevState) => {
            return {
              hasResults: (body.length > 0),
              showDroplist: (body.length > 0),
              words: body
            }
          });
        });
    } else {
      this.setState((prevState) => {
        return {
          showDroplist: false
        }
      });
    }
  }

  onFocus() {
    this.setState((prevState) => {
      return {
        showDroplist: prevState.hasResults
      }
    });
  }

  onBlur() {
    if (!this.state.searchDroplistHover) {
      this.setState((prevState) => {
        return {
          showDroplist: false
        }
      });
    }
  }

  onKeyDown(event) {
    if (!this.state.composing) {
      switch (event.key) {
        case 'ArrowDown':
          if (this.refs.SearchDroplist) {
            this.refs.SearchDroplist.onDownKey();
          }
          break;
        case 'ArrowUp':
          if (this.refs.SearchDroplist) {
            this.refs.SearchDroplist.onUpKey();

            // Stop the cursor for moving to the state of the input
            event.preventDefault();
          }
          break
        case 'Enter':
          if (this.refs.SearchDroplist) {
            this.refs.SearchDroplist.onEnterKey();
          }
          break
        default:
      }
    }
  }

  onSearchDroplistMouseIn() {
    this.setState((prevState) => {
      return {
        searchDroplistHover: true
      }
    });
  }

  onSearchDroplistMouseOut() {
    this.setState((prevState) => {
      return {
        searchDroplistHover: false
      }
    });
  }

  onCompositionStart() {
    this.setState((prevState) => {
      return {
        composing: true
      }
    });
  }

  onCompositionEnd() {
    this.setState((prevState) => {
      return {
        composing: false
      }
    });
  }

  renderSearchDroplist() {
    if (this.state.showDroplist) {
      return(
        <SearchDroplist
          ref="SearchDroplist"
          words={this.state.words}
          resetSearch={this.resetSearch.bind(this)}
          mouseIn={this.onSearchDroplistMouseIn.bind(this)}
          mouseOut={this.onSearchDroplistMouseOut.bind(this)}
          history={this.props.history}
        />
      );
    }
  }

  render() {
    const containerStyle = {
      position: 'relative',
      width: 'calc(100% - 10px)'
    }

    const inputStyle = {
      height: '36px',
      borderRadius: '2px',
      outline: 'none',
      marginLeft: '10px',
      width: 'calc(100% - 20px)',
      paddingLeft: '10px',
      fontSize: '14px',
      backgroundColor: '#00abc0',
      color: '#FFF'
    };

    return(
      <span style={containerStyle}>
        <input
          ref="input"
          style={inputStyle}
          className="search-input"
          value={this.state.search}
          tabIndex="1"
          onChange={this.onInputChange.bind(this)}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          onCompositionStart={this.onCompositionStart.bind(this)}
          onCompositionEnd={this.onCompositionEnd.bind(this)}
        />
        {this.renderSearchDroplist()}
      </span>
    );
  }
}

export default withRouter(Search);
