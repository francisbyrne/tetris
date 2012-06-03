// Game object representing the tetris game
var Game = function() {

  paper.setup('tetrisCanvas');

  var activeTetrimino = new Tetrimino(new Point(160,0));
  var bottom = [];

  this.iterate = function() {
    if (activeTetrimino.isFalling) {
      activeTetrimino.position.y += activeTetrimino.blockSize.height;

      for (tetrimino in bottom) {
        for (block in tetrimino.children) {
          if (activeTetrimino.contains(block)) {
            onLanding();
          }
        }
      }
      
      if (activeTetrimino.isTouching('bottom')) {
        onLanding();
      }
    }
  };

  var onLanding = function() {
    activeTetrimino.isFalling = false;
    bottom.push(activeTetrimino);
    activeTetrimino = new Tetrimino(new Point(160, 0));
  }

  var tool = new Tool();
  tool.onKeyDown = function(event) {
    switch(event.key) {
      case 'left':
        if (!activeTetrimino.isTouching('left'))
          activeTetrimino.position.x -= activeTetrimino.blockSize.width;
        break;
      case 'right':
        if (!activeTetrimino.isTouching('right'))
          activeTetrimino.position.x += activeTetrimino.blockSize.width;
        break;
      case 'up':
        activeTetrimino.rotate(90);
        if (activeTetrimino.isTouching('left') || activeTetrimino.isTouching('right'))
          activeTetrimino.rotate(-90);
        break;
    }
  };
};