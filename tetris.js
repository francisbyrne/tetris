var speed = 20;
var blockSize = 20;
var types = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

paper.install(window);
window.onload = function() {
  paper.setup('tetrisCanvas');

  block = new Tetrimino(new Point(200, 200), new Size(blockSize, blockSize));
  path.strokeColor='red';
  view.onFrame = function(event) {
    if (event.count % speed === speed - 1) {
      //block.iterate();
    }
  }
};

var Tetrimino = Base.extend({
  initialize: function(point, size) {
    this.x = point.x;
    this.y = point.y;
    this.width = size.width;
    this.height = size.height;
    this.isFalling = true;
    this.createPaths();
  },

  createPaths: function() {
    this.item = new CompoundPath(
      new Path.Rectangle(
        new Point(this.x, this.y), 
        new Size(this.width, this.height)
      )
    );

    for (var i=0; i<3; i++) 
      this.item.addChild(nextBlock(this.item));

    console.log(this.item);

    this.item.strokeColor = 'black';
    this.item.fillColor = 'green';
  },

  iterate: function() {
    if (this.isFalling) {
      this.y += this.height;
      this.item.position.y = this.y + this.height / 2;

      if (this.y >= view.size.height - this.height)
        this.isFalling = false;
    }
  }
});

var nextBlock = function (blocks) {
  var block = blocks.lastChild;
  var width = block.bounds.width;
  var height = block.bounds.height;
  var size = new Size(width, height);
  var point = block.segments[2].point;
  switch(Math.round(Math.random() * 3)) {
    case 0:
      point = new Point(point.x - width * 2, point.y - height);
      break;
    case 1:
      point = new Point(point.x - width, point.y - height * 2);
      break;
    case 2:
      point = new Point(point.x, point.y - height);
      break;
    default:
      point = new Point(point.x - width, point.y);
      break;
  }
  console.log(point);
  return new Path.Rectangle(point, size);
};