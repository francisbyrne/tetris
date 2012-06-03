
var SPEED = 20;

window.onload = function() {

  var game = new Game();

  view.onFrame = function(event) {
    if (event.count % SPEED === SPEED - 1) {
      game.iterate();
    }
  };
};