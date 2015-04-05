// Game object representing the tetris game
var Game = function() {

  //----------------------------------
  // constants
  //----------------------------------
  var SPEED = 20, // no. frames between each movement
    nx      = 10, // width of tetris court (in blocks)
    ny      = 20, // height of tetris court (in blocks)
    nux     = 5,  // width of upcoming preview (in blocks)
    nuy     = 4;  // height of upcoming preview (in blocks)

  var board,
    activeTet,

      // Get a reference to the canvas object
    canvas = document.getElementById('tetrisCanvas');

    dx = canvas.width / nx,   // single block width
    dy = canvas.height / ny;  // single block height

  // Create an empty project and a view for the canvas:
  paper.setup(canvas);
      
  activeTet = new Tetrimino(new Point(160, 160), 'j');
  activeTet.drawTet(dx, dy);


  // var tool = new Tool();
  // tool.onKeyDown = function(event) {
  //   switch(event.key) {
  //     case 'left':
  //       if (!activeTet.isTouching('left') && ! this.paused)
  //         activeTet.position.x -= activeTet.blockSize.width;
  //       break;
  //     case 'right':
  //       if (!activeTet.isTouching('right') && ! this.paused)
  //         activeTet.position.x += activeTet.blockSize.width;
  //       break;
  //     case 'up':
  //       if ( ! this.paused ) {
  //         // console.log(activeTet.position);
  //         // var pos = new Point(activeTet.position.x + activeTet.blockSize.width / 2, activeTet.position.y);
  //         // console.log(pos);
  //         activeTet.rotate(90);
  //         if (activeTet.isTouching('left') || activeTet.isTouching('right'))
  //           activeTet.rotate(-90);
  //       }
  //       break;
  //     case 'down':
  //       this.speed = 2;
  //       break;
  //     case 'p':
  //       this.paused = ! this.paused;
  //     default:
  //   }
  // }.bind(this);

  // tool.onKeyUp = function(event) {
  //   this.speed = SPEED;
  // }.bind(this);
};