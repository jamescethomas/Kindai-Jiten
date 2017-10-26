import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Strings from 'react-l20n-u';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import App from 'App.js';
import WordsList from 'components/Words/WordsList.js';
import Paginator from 'components/Paginator.js';
import Animation from 'utils/Animation.js';

const ITEMS_PER_PAGE = 3;

class Author extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      currentPage: 1,
      numberOfPages: 1,
      author: null
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
        offset = ITEMS_PER_PAGE * (page - 1),
        userid = this.props.match.params.userid;

    Animation.initFadeAnimation(this.refs.author);

    // Get the words and store them in state
    fetch('/words?userid=' + userid + '&limit=' + limit + '&offset=' + offset)
      .then(res => res.json())
      .then(body => {
        this.setState((prevState) => {
          var total = Math.ceil(body.total/ITEMS_PER_PAGE),
              author = null;
          this.refs.paginator.onDataLoad(total, body.words.length, page);

          if (body.words.length > 0) {
            author = body.words[0].user;
          }

          return {
            words: body.words,
            numberOfPages: total,
            currentPage: page,
            author: author
          }
        });

        Animation.fadeAnimation(this.refs.author);
      });
  }

  onPageChange(page) {
    this.props.history.push('/author/' + this.props.match.params.userid + '/page/' + page);
    this.getWords(page);
    window.scrollTo(0, 1);
  }

  render() {
    var currentPage = 1,
        author,
        authorName;

    if (this.props.match.params.page) {
      currentPage = this.props.match.params.page;
    } else if (this.state.currentPage !== 1) {
      this.getWords(1);
    }

    if (this.state.author) {
      author = this.state.author;

      if (author.userName) {
        authorName = author.userName;
      } else if (author.firstName && author.lastName) {
        if (this.props.language === 'JP') {
          authorName = author.lastName + ' ' + author.firstName;
        } else {
          authorName = author.firstName + ' ' + author.lastName;
        }
      } else {
        authorName = author.firstName;
      }
    }

    const paperStlye = {
      maxWidth: 600,
      margin: '20px auto 0',
      padding: 20,
      textAlign: 'left',
      backgroundColor: 'rgb(0, 188, 212)',
      color: '#fff',
      fontSize: '20px'
    }

    return (
      <div className="Home" ref="author">
        <MuiThemeProvider muiTheme={App.myTheme}>
          <div>
            <Paper style={paperStlye}>
              {Strings.get('author', {name: authorName})}
            </Paper>
            <WordsList words={this.state.words} deleteWordCallback={this.getWords.bind(this)} />
            <Paginator
              ref="paginator"
              page={currentPage}
              numberOfPages={this.state.numberOfPages}
              onPageChange={this.onPageChange.bind(this)}
              hideSinglePage={true}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    language: state.language
  }
}

export default withRouter(
  connect(mapStateToProps, null)(Author)
);
