import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Author extends Component {
  onClick() {
    this.props.history.push('/author/' + this.props.user.userid);
  }

  render() {
    var user = this.props.user,
        userName = '';
    if (user.userName) {
      userName = user.userName;
    } else if (user.firstName && user.lastName) {
      if (this.props.language === 'JP') {
        userName = user.lastName + ' ' + user.firstName;
      } else {
        userName = user.firstName + ' ' + user.lastName;
      }
    } else {
      userName = user.firstName;
    }

    const style = {
      textAlign: 'left',
      fontSize: '15px',
      paddingBottom: '10px',
    }

    if (this.props.language === 'JP') {
      return(
        <div style={style}>
            <span className="link" onClick={this.onClick.bind(this)}>{userName}</span> 作
        </div>
      );
    } else {
      return(
        <div style={style}>
          By <span className="link" onClick={this.onClick.bind(this)}>{userName}</span>
        </div>
      );
    }
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
