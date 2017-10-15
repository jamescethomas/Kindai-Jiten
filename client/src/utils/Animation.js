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
  },

  slideAnimation: function (elem) {
    elem.style.transform = "translate(0, -56px)";

    window.requestAnimationFrame(function() {
      // Now set a transition on the opacity
      elem.style.transition = "transform 1s";
      elem.style.webkitTransition = "transform 1s";

      // and set the opacity to 1
      elem.style.transform = "translate(0, 0)";
    });
  }
};
