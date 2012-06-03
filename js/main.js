

window.onload = function() {

  var game = new Game();

  view.onFrame = function(event) {
    if (event.count % game.speed === game.speed - 1 && ! game.paused) {
      game.iterate();
    }
  };
};