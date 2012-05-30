
var SPEED = 20;

paper.install(window);
window.onload = function() {
  paper.setup('tetrisCanvas');

  block = new Tetrimino(new Point(160,0));
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
        if (!activeBlock.isTouching('left'))
          activeBlock.position.x -= activeBlock.blockSize.width;
        break;
      case 'right':
        if (!activeBlock.isTouching('right'))
        activeBlock.position.x += activeBlock.blockSize.width;
        break;
      case 'up':
        activeBlock.rotate(90);
        if (activeBlock.isTouching('left') || activeBlock.isTouching('right'))
          activeBlock.rotate(-90);
        break;
    }
  }
};

var Tetrimino = CompoundPath.extend({
  initialize: function(point, blockSize) {
    this.base();
    var BLOCKSIZE = new Size(20, 20);
    var START_POSITION = new Point(160, 0);
    var point = (typeof point === 'undefined') ? START_POSITION : point;
    var types = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    this.type = types[Math.round(Math.random() * (types.length -1))];
    this.blockSize = (typeof blockSize === 'undefined') ? BLOCKSIZE : blockSize;
    this.isFalling = true;
    this.createPath(point, this.blockSize);
  },

  isTouching: function(object) {
        for (i in this.children) {
          var child = this.children[i];
          for (j in child.segments) {
            var point = child.segments[j].point;
            switch (object) {
              case 'left':
                if (point.x <= 0)
                  return point.x <= 0;
                break;
              case 'right':
                if (point.x >= view.size.width)
                  return true;
                break;
              case 'bottom':
                if (point.y >= view.size.height)
                  return true;
                break;
            }
          }
        }
        return false;
  },

  iterate: function() {
    if (this.isFalling) {
      this.position.y += this.blockSize.height;

      //if (this.position.y >= view.size.height - this.blockSize.height)
      if (this.isTouching('bottom'))
        this.isFalling = false;
    }
  },

  createPath: function(point, blockSize) {
    var grid = createGrid(point, blockSize, 3, 4);

    switch(this.type) {
    case 'I':
      this.addChildren(
         [new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[2][1], grid[3][2]),
         new Path.Rectangle(grid[3][1], grid[4][2])]
       );
      this.fillColor = 'red';
      break;
    case 'J':
      this.addChildren(
         [new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[2][1], grid[3][2]),
         new Path.Rectangle(grid[2][0], grid[3][1])]
       );
      this.fillColor = 'yellow';
      break;
    case 'L':
      this.addChildren(
         [new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[2][1], grid[3][2]),
         new Path.Rectangle(grid[2][2], grid[3][3])]
       );
      this.fillColor = 'magenta';
      break;
    case 'O':
      this.addChildren(
         [new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[0][2], grid[1][3]),
         new Path.Rectangle(grid[1][2], grid[2][3])]
       );
      this.fillColor = 'blue';
      break;
    case 'S':
      this.addChildren(
         [new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[0][2], grid[1][3]),
         new Path.Rectangle(grid[1][0], grid[2][1])]
       );
      this.fillColor = 'cyan';
      break;
    case 'T':
      this.addChildren(
         [new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[1][2], grid[2][3]),
         new Path.Rectangle(grid[1][0], grid[2][1])]
       );
      this.fillColor = 'green';
      break;
    case 'Z':
      this.addChildren(
         [new Path.Rectangle(grid[0][1], grid[1][2]),
         new Path.Rectangle(grid[1][1], grid[2][2]),
         new Path.Rectangle(grid[0][0], grid[1][1]),
         new Path.Rectangle(grid[1][2], grid[2][3])]
       );
      this.fillColor = 'orange';
      break;
    default:
      this.addChildren();
      break;
    }

    this.strokeColor = 'black';
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