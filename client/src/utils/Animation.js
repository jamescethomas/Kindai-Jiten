module.exports = {
  initFadeAnimation: function (elem, reset) {
    var reset = (reset) ? true : false;

    if (reset) {
      elem.style.transition = "";
      elem.style.webkitTransition = "";
    }

    // Set the opacity of the element to 0
    elem.style.opacity = 0;
  },

  fadeAnimation: function (elem) {
    window.requestAnimationFrame(function() {
      // Now set a transition on the opacity
      elem.style.transition = "opacity 500ms";
      elem.style.webkitTransition = "opacity 500ms";
      // and set the opacity to 1
      elem.style.opacity = 1;
    });
  }
};
