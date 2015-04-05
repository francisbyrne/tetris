// Tetrimino object (tet for short), represents a tetris piece as a compound path of rectangle paths
// with added collision detection.
var Tetrimino = CompoundPath.extend({

  initialize: function(point, type) {

    // super constructor    
    this.base();

    // constants
    var START_POSITION = new Point(160, 0),
      TYPES = {
        'i' : { size: 4, blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan'   },
        'j' : { size: 3, blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   },
        'l' : { size: 3, blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' },
        'o' : { size: 2, blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' },
        's' : { size: 3, blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  },
        't' : { size: 3, blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' },
        'z' : { size: 3, blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    }
      };

    // variables
    this.size     = TYPES[type].size;                                     // max height/width (in blocks)
    this.blocks   = TYPES[type].blocks;                                   // blocks in tet for each direction
    this.rotation = Math.round(Math.random() * (this.blocks.length -1));  // rotation of the block
    this.color    = TYPES[type].color;                                    // fill color of tet
    this.position = (typeof point === 'undefined') ? START_POSITION : point;
  },

  //------------------------------------------------
  // do the bit manipulation and iterate through each
  // occupied block (x,y) for a given piece
  //------------------------------------------------
  eachblock: function(x, y, fn) {
    var bit, result, row = 0, col = 0, blocks = this.blocks[this.rotation];
    for(bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
      if (blocks & bit) {
        fn(x + col, y + row);
      }
      if (++col === 4) {
        col = 0;
        ++row;
      }
    }
  },

  drawTet: function(dx, dy) {
    var x = this.position.x,
      y = this.position.y;
      
    this.eachblock(x, y, function(dx, dy) {
      this.addChild( new Path.Rectangle(new Point(x, y), new Size(dx, dy)) );
    }.bind(this));

    console.log(this.children);
    this.selected = true;

    this.fillColor = this.color;
    this.strokeColor = 'black';

    // Draw the view now:
     paper.view.draw();
  },


  // Create a grid of points
  // topLeft: top left point
  // blockSize: size of each block
  // width: number of blocks wide
  // height: number of blocks deep
  createGrid: function(topLeft, blockSize, width, height) {
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

  createPath: function(point, blockSize) {
    var grid = this.createGrid(point, blockSize, 3, 4);

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
