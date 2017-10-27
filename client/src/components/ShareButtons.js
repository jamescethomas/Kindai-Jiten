import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import FontAwesome from 'react-fontawesome';
import Strings from 'react-l20n-u';

class ShareButtons extends Component {
  render() {
    var url = encodeURI('http://localhost:3000/word/' + this.props.word);
    var message = encodeURI(Strings.getRaw('share-message'));

    const style = {
      minWidth: '25px',
      height: '25px',
      marginLeft: '5px'
    }

    const iconStyle = {
      color: '#fff',
      paddingTop: '4px',
      paddingLeft: '1px'
    }

    const containerStyle = {
      textAlign: 'right',
      marginTop: '10px'
    }

    return (
      <div style={containerStyle}>
        <RaisedButton
          className="share-button"
          backgroundColor="#3b5998"
          style={style}
          icon={<FontAwesome style={iconStyle} name='facebook'/>}
          href={"https://facebook.com/sharer/sharer.php?u=" + url}
          target="_blank"
        />
        <RaisedButton
          className="share-button"
          backgroundColor="#55acee"
          style={style}
          icon={<FontAwesome style={iconStyle} name='twitter'/>}
          href={"https://twitter.com/intent/tweet/?text=" + message + ";url=" + url}
          target="_blank"
        />
        <RaisedButton
          className="share-button"
          backgroundColor="#dd4b39"
          style={style}
          icon={<FontAwesome style={iconStyle} name='google'/>}
          href={"https://plus.google.com/share?url=" + url}
          target="_blank"
        />
        <RaisedButton
          className="share-button"
          backgroundColor="#777777"
          style={style}
          icon={<FontAwesome style={iconStyle} name='envelope'/>}
          href={"mailto:?subject=" + message + ";body=" + url}
          target="_blank"
        />
      </div>
    );
  }
}

export default ShareButtons;
