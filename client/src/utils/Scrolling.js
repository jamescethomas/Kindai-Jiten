module.exports = {
  scrollToElement: function (elem) {
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  },
};
