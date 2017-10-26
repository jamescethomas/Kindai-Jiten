import React, { Component } from 'react';
import ContactForm from 'pages/Contact/ContactForm.js';
import Animation from 'utils/Animation.js';

class Contact extends Component {
  componentDidMount() {
    var elem = this.refs.contact;
    Animation.initFadeAnimation(elem);
    Animation.fadeAnimation(elem);
  }

  render() {
    return (
      <div className="Contact" ref="contact">
        <ContactForm />
      </div>
    );
  }
}

export default Contact;
