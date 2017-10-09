import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';

class Paginator extends Component {
  constructor(props) {
    super(props);

    var page = parseInt(this.props.page, 10);

    this.state = {
      currentPage: page,
      disablePrev: (page === 1),
      disableNext: (page === this.props.numberOfPages),
      visible: false
    };
  }

  onPageClick(index) {
    this.setState((prevState) => {

      this.props.onPageChange(index);

      return {
        currentPage: index,
        disablePrev: (index=== 1),
        disableNext: (index === this.props.numberOfPages)
      }
    });
  }

  onPrevClick() {
    this.setState((prevState) => {
      var index = prevState.currentPage - 1;

      this.props.onPageChange(index);

      return {
        currentPage: index,
        disablePrev: (index === 1),
        disableNext: (index === this.props.numberOfPages)
      }
    });
  }

  onNextClick() {
    this.setState((prevState) => {
      var index = prevState.currentPage + 1;

      this.props.onPageChange(index);

      return {
        currentPage: index,
        disablePrev: (index === 1),
        disableNext: (index === this.props.numberOfPages)
      }
    });
  }

  onDataLoad(total, count, page) {
    this.setState((prevState) => {
      var updatedState =  {
        visible: count > 0,
        currentPage: parseInt(page, 10),
        disablePrev: (page === 1),
        disableNext: (page === total)
      }

      return updatedState;
    });
  }

  renderPages() {
    var pages = [],
        self = this,
        i;

    var style = {
      cursor: 'pointer',
      padding: '10px',
      minWidth: '10px',
      lineHeight: 'normal'
    }

    var highlightedStyle = _.extend({}, style, {
      color: '#FFF',
      backgroundColor: 'rgb(0, 188, 212)',
      cursor: 'default',
      pointerEvents: 'none'
    });

    if (this.props.numberOfPages > 10) {
      if (this.state.currentPage < 7) {
        // 1 2 3 4 5 6 7 ... 99 100
        // render the first 7
        for (i = 1; i <= 7; i++) {
          pages.push(
            <FlatButton
              style={(i === this.state.currentPage) ? highlightedStyle : style }
              key={i}
              onClick={this.onPageClick.bind(this, i)}
            >
            {i}
            </FlatButton>
          );
        }

        // add ...
        pages.push(
          <span key="elip1">...</span>
        );

        // render the last two
        _.each([this.props.numberOfPages - 1, this.props.numberOfPages], function (i) {
          pages.push(
            <FlatButton
              style={(i === self.state.currentPage) ? highlightedStyle : style }
              key={i}
              onClick={self.onPageClick.bind(self, i)}
            >
            {i}
            </FlatButton>
          );
        });
      } else if (this.state.currentPage > (this.props.numberOfPages - 7)) {
        // 1 2 ... 94 95 96 97 98 99 100
        // render the first two
        _.each([1, 2], function (i) {
          pages.push(
            <FlatButton
              style={(i === self.state.currentPage) ? highlightedStyle : style }
              key={i}
              onClick={self.onPageClick.bind(self, i)}
            >
            {i}
            </FlatButton>
          );
        });

        // add ...
        pages.push(
          <span key="elip1">...</span>
        );

        // render the last 7
        for (i = this.props.numberOfPages - 7; i <= this.props.numberOfPages; i++) {
          pages.push(
            <FlatButton
              style={(i === this.state.currentPage) ? highlightedStyle : style }
              key={i}
              onClick={this.onPageClick.bind(this, i)}
            >
            {i}
            </FlatButton>
          );
        }
      } else {
        // 1 2 ... 51 52 (53) 54 55 ... 99 100
        // render the first two
        _.each([1, 2], function (i) {
          pages.push(
            <FlatButton
              style={(i === self.state.currentPage) ? highlightedStyle : style }
              key={i}
              onClick={self.onPageClick.bind(self, i)}
            >
            {i}
            </FlatButton>
          );
        });

        // add ...
        pages.push(
          <span key='elip1'>...</span>
        );

        // render the middle 5
        for (i = this.state.currentPage - 2; i <= this.state.currentPage + 2; i++) {
          pages.push(
            <FlatButton
              style={(i === this.state.currentPage) ? highlightedStyle : style }
              key={i}
              onClick={this.onPageClick.bind(this, i)}
            >
            {i}
            </FlatButton>
          );
        }

        // add ...
        pages.push(
          <span key='elip2'>...</span>
        );

        // render the last two
        _.each([this.props.numberOfPages - 1, this.props.numberOfPages], function (i) {
          pages.push(
            <FlatButton
              style={(i === self.state.currentPage) ? highlightedStyle : style }
              key={i}
              onClick={self.onPageClick.bind(self, i)}
            >
            {i}
            </FlatButton>
          );
        });
      }
    } else {
      for (i = 1; i <= this.props.numberOfPages; i++) {
          pages.push(
            <FlatButton
              style={(i === this.state.currentPage) ? highlightedStyle : style }
              key={i}
              onClick={this.onPageClick.bind(this, i)}
            >
            {i}
            </FlatButton>
          );
      }
    }

    return (
      <span>
        {pages}
      </span>
    )
  }

  render() {
    const paginatorStyle = {
      userSelect: 'none',
      paddingBottom: 10,
      paddingTop: 20
    }

    const buttonStyle = {
      lineHeight: 'normal',
      minWidth: '10px',
      padding: '10px'
    }

    if (!this.state.visible) {
      paginatorStyle.display = 'none';
    }

    if (this.props.numberOfPages > 1) {
      return (
          <div style={paginatorStyle}>
            <FlatButton
              style={buttonStyle}
              disabled={this.state.disablePrev}
              onClick={this.onPrevClick.bind(this)}
            >prev</FlatButton>
            {this.renderPages()}
            <FlatButton
              style={buttonStyle}
              disabled={this.state.disableNext}
              onClick={this.onNextClick.bind(this)}
            >next</FlatButton>
          </div>
      );
    } else {
      return(<div/>);
    }
  }
}

export default Paginator;
