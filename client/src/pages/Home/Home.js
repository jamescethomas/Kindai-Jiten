import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import L20n from 'react-l20n-u';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from 'App.js';
import WordsList from 'components/Words/WordsList.js';
import Paginator from 'components/Paginator.js';
import Animation from 'utils/Animation.js';

const ITEMS_PER_PAGE = 3;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      currentPage: 1,
      numberOfPages: 1
    };
  }

  componentDidMount() {
    var currentPage = 1;

    if (this.props.match.params.page) {
      currentPage = this.props.match.params.page;
    }

    this.getWords(currentPage);
  }

  getWords(page) {
    var limit = ITEMS_PER_PAGE,
        offset = ITEMS_PER_PAGE * (page - 1);

    // Init the fade animation
    Animation.initFadeAnimation(this.refs.home);

    // Get the words and store them in state
    fetch('/words?limit=' + limit + '&offset=' + offset)
      .then(res => res.json())
      .then(body => {
        this.setState((prevState) => {
          var total = Math.ceil(body.total/ITEMS_PER_PAGE);
          this.refs.paginator.onDataLoad(total, body.words.length, page);

          return {
            words: body.words,
            numberOfPages: total,
            currentPage: page
          }
        });

        // Fade in the content
        Animation.fadeAnimation(this.refs.home);
      });
  }

  onPageChange(page) {
    this.props.history.push('/home/page/' + page);
    this.getWords(page);
    window.scrollTo(0, 1);
  }

  render() {
    var currentPage = 1;

    if (this.props.match.params.page) {
      currentPage = this.props.match.params.page;
    } else if (this.state.currentPage !== 1) {
      this.getWords(1);
    }

    return (
      <div className="Home" ref="home">
        <MuiThemeProvider muiTheme={App.myTheme}>
          <div>
          <WordsList words={this.state.words} deleteWordCallback={this.getWords.bind(this)} />
          <Paginator
            ref="paginator"
            page={currentPage}
            numberOfPages={this.state.numberOfPages}
            onPageChange={this.onPageChange.bind(this)}
          />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(Home);
