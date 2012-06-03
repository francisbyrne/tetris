// Game object representing the tetris game
var Game = function() {

  var SPEED = 20;

  paper.setup('tetrisCanvas');

  var activeTetrimino = new Tetrimino(new Point(160,0));
  var bottom = [];
  this.speed = SPEED;
  this.paused = false;

  this.iterate = function() {
    if (activeTetrimino.isFalling) {
      activeTetrimino.position.y += activeTetrimino.blockSize.height;
      
      // test colliding with other tetriminos
      
      if (activeTetrimino.isTouching('bottom')) {
        onLanding();
      }
    }
  };

  var onLanding = function() {
    activeTetrimino.isFalling = false;
    bottom.push(activeTetrimino);
    activeTetrimino = new Tetrimino(new Point(160, 0));
  };

  // Create a grid of points
  // topLeft: top left point
  // blockSize: size of each block
  // width: number of blocks wide
  // height: number of blocks deep
  var createGrid = function(topLeft, blockSize, width, height) {
    var grid = [];
    for (var j = 0; j <= height; j++) {
      var row = [];
      for (var i = 0; i <= width; i++) {
        row.push(
          new Point(topLeft.x + blockSize.width * i,
            topLeft.y + blockSize.height * j));
      }
      grid.push(row);
    }
    return grid;
  },

  var tool = new Tool();
  tool.onKeyDown = function(event) {
    switch(event.key) {
      case 'left':
        if (!activeTetrimino.isTouching('left') && ! this.paused)
          activeTetrimino.position.x -= activeTetrimino.blockSize.width;
        break;
      case 'right':
        if (!activeTetrimino.isTouching('right') && ! this.paused)
          activeTetrimino.position.x += activeTetrimino.blockSize.width;
        break;
      case 'up':
        if ( ! this.paused ) {
          activeTetrimino.rotate(90);
          if (activeTetrimino.isTouching('left') || activeTetrimino.isTouching('right'))
            activeTetrimino.rotate(-90);
        }
        break;
      case 'down':
        this.speed = 2;
        break;
      case 'p':
        this.paused = ! this.paused;
      default:
    }
  }.bind(this);

  tool.onKeyUp = function(event) {
    this.speed = SPEED;
  }.bind(this);
};