
var SPEED = 20;

paper.install(window);
window.onload = function() {
  paper.setup('tetrisCanvas');

  block = new Tetrimino();
  var activeBlock = block;
  console.log(activeBlock);

  view.onFrame = function(event) {
    if (event.count % SPEED === SPEED - 1) {
       activeBlock.iterate();
    }
  };

  var tool = new Tool();
  tool.onKeyDown = function(event) {
    switch(event.key) {
      case 'left':
        activeBlock.item.position.x -= activeBlock.size.width;
        break;
      case 'right':
        activeBlock.item.position.x += activeBlock.size.width;
        break;
      case 'up':
        activeBlock.item.rotate(90);
        break;
    }
  }
};

var Tetrimino = Base.extend({
  initialize: function(point, size) {
    var BLOCKSIZE = 20;
    var types = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    this.type = types[Math.round(Math.random() * (types.length -1))];
    this.point = (typeof point === 'undefined') ? new Point(160,0) : point;
    this.size = (typeof size === 'undefined') ? new Size(BLOCKSIZE,BLOCKSIZE) : size;
    this.isFalling = true;
    this.createPath(this.point, this.size);
  },

  iterate: function() {
    if (this.isFalling) {
      this.item.position.y += this.size.height;

      if (this.item.position.y >= view.size.height - this.size.height)
        this.isFalling = false;
    }
  },

  createPath: function(point, blockSize) {
    var grid = createGrid(point, blockSize, 3, 4);

    switch(this.type) {
    case 'I':
      this.item = new CompoundPath(
         new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[2][1], grid[3][2]),
         new Path.Rectangle(grid[3][1], grid[4][2])
       );
      this.item.fillColor = 'red';
      break;
    case 'J':
      this.item = new CompoundPath(
         new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[2][1], grid[3][2]),
         new Path.Rectangle(grid[2][0], grid[3][1])
       );
      this.item.fillColor = 'yellow';
      break;
    case 'L':
      this.item = new CompoundPath(
         new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[2][1], grid[3][2]),
         new Path.Rectangle(grid[2][2], grid[3][3])
       );
      this.item.fillColor = 'magenta';
      break;
    case 'O':
      this.item = new CompoundPath(
         new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[0][2], grid[1][3]),
         new Path.Rectangle(grid[1][2], grid[2][3])
       );
      this.item.fillColor = 'blue';
      break;
    case 'S':
      this.item = new CompoundPath(
         new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[0][2], grid[1][3]),
         new Path.Rectangle(grid[1][0], grid[2][1])
       );
      this.item.fillColor = 'cyan';
      break;
    case 'T':
      this.item = new CompoundPath(
         new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[1][2], grid[2][3]),
         new Path.Rectangle(grid[1][0], grid[2][1])
       );
      this.item.fillColor = 'green';
      break;
    case 'Z':
      this.item = new CompoundPath(
         new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[0][0], grid[1][1]),
         new Path.Rectangle(grid[1][2], grid[2][3])
       );
      this.item.fillColor = 'orange';
      break;
    default:
      this.item = new CompoundPath();
      break;
    }

    this.item.strokeColor = 'black';
  }
});

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
};