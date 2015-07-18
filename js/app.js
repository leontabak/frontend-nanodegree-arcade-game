// Project 3 (Arcade Game) for Udacity's Front End Web Developer Nanodegree
// Leon Tabak
// 18 July 2015

// Use the functional style for the definition
// of JavaScript classes.

// The parameters here are the constants that
// define the dimensions of the gameboard, the
// tiles on the gameboard, and a factor that is
// used in determining the speed with which Enemies
// move.
var parameters = {
    rows : 6,             // #rows
    columns : 5,          // #columns
    blockWidth : 101,     // width-of-each-column
    blockHeight : 83,     // height-of-each-row
    worldWidth : 5 * 101, // #columns * width-of-each-column
    worldHeight : 6 * 83, // #rows * height-of-each-row

    // Assign to the speed multiplier a small value
    // to make it easy to win the game.
    // This value can be increased later (after 
    // program is complete, tested, and working) to
    // make a more challenging game.
    speedMultiplier : 32
};

var BoundingBox = function( cx, cy, hw, hh ) {
    var centerX = cx;
    var centerY = cy;
    var halfWidth = hw;
    var halfHeight = hh

    var that = {};
    that.getCenterX = function() { return centerX; };
    that.getCenterY = function() { return centerY; };
    that.getHalfWidth = function() { return halfWidth; };
    that.getHalfHeight = function() { return halfHeight; };
    that.intersects = function( otherBox ) {
	var xOverlap = Math.abs(centerX - otherBox.getCenterX()) < (halfWidth + otherBox.getHalfWidth());
	var yOverlap = Math.abs(centerY - otherBox.getCenterY()) < (halfHeight + otherBox.getHalfHeight());
	return xOverlap && yOverlap;
    };
    return that;;
};

var Point2D = function( xCoordinate, yCoordinate ) {
    var x = xCoordinate;
    var y = yCoordinate;

    var that = {};
    that.getX = function() { return x; };
    that.setX = function( xCoordinate ) { x = xCoordinate; };
    that.getY = function() { return y; };
    that.setY = function( yCoordinate ) { y = yCoordinate; };
    return that;
};

var Boundable = function( upperLeftCorner ) {
    // (x,y) is the the upper-left corner of the
    // smallest axis-aligned rectangle that can contain
    // the Boundable object
    var ul = upperLeftCorner;

    var that = {};
    // The bounding box is the smallest axis-aligned rectangle
    // that can contain the image of the Player.
    // Players and enemies can compute their bounding boxes.
    // Bounding boxes can be used to compute intersections/collisions
    // between players and enemies.
    that.boundingBox = function() {
	var hw = parameters.blockWidth/2;
	var hh = parameters.blockHeight/2;
	var cx = ul.getX() + hw;
	var cy = ul.getY() + hh;
	return BoundingBox( cx, cy, hw, hh );
    };
    return that;
};

// Enemies our player must avoid
var Enemy = function() {
    // (x,y) is the the upper-left corner of the
    // smallest axis-aligned rectangle that can contain
    // the Enemy.
    var x = 0;
    var y = 0;
    var upperLeftCorner = Point2D( x, y );

    // An Enemy can have any one of 3 possible speeds.
    // All speeds are equally likely.
    // Speeds are randomly selected.
    var speed = 1 + Math.floor(Math.random() * 3);
    var sprite = "images/enemy-bug.png";

    // Create an object named "that" that contains functions
    // and return that object as the value of this function.

    // An Enemy is a Boundable object---it inherits from the Boundable class.
    // (This means that it has a boundingBox() method.)
    var that = Boundable( upperLeftCorner );

    // render() draws an image of the Enemy on the gameboard.
    that.render = function() {
	ctx.drawImage(Resources.get(sprite),upperLeftCorner.getX(),upperLeftCorner.getY());
    };

    // setPosition() places that Enemy in a specified row and at a
    // randomly selected horizontal coordinate.
    that.setPosition = function( row ) {
	upperLeftCorner.setX( Math.floor( 5 * Math.random()) * parameters.blockWidth );
	upperLeftCorner.setY( parameters.blockHeight + row * parameters.blockHeight );
    };

    // update() moves the Enemy in each frame of the animation.
    that.update = function(dt) {
	if( upperLeftCorner.getX() > parameters.worldWidth ) {
	    upperLeftCorner.setX( 0 );;
	} // if
	else {
	    upperLeftCorner.setX( upperLeftCorner.getX() + dt * speed * parameters.speedMultiplier );;
	} // else
    };
    return that;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // A player knows its location and the image with which 
    // it should be represented.
    // (x,y) is the upper-left corner of the smallest box
    // that contains the image that represents the player.
    var x = Math.floor(parameters.columns/2) * parameters.blockWidth;
    var y = (parameters.rows - 1) * parameters.blockHeight;
    var upperLeftCorner = Point2D( x, y );
    var sprite = "images/char-boy.png";

    // The following four methods can only be called
    // from within this definition of the Player class.
    // The player's public handleInput() function calls roomToMoveUp(),
    // roomToMoveDown(), roomToMoveLeft(), and roomToMoveRight().
    var roomToMoveUp = function() {
	return upperLeftCorner.getY() > 0;
    };
    var roomToMoveDown = function() {
	return upperLeftCorner.getY() < (parameters.rows - 1) * parameters.blockHeight;
    };
    var roomToMoveLeft = function() {
	return upperLeftCorner.getX() > 0;
    };
    var roomToMoveRight = function() {
	return upperLeftCorner.getX() < (parameters.columns - 1) * parameters.blockWidth;
    };

    // Create an object named "that" that contains functions
    // and return that object as the value of this function.

    // A Player is a Boundable object---it inherits from the Boundable class.
    // (This means that it has a boundingBox() method.)
    var that = Boundable( upperLeftCorner );

    // The player's event listener calls handleInput().
    // If the human being who is playing the game has
    // pressed an arrow key, the value of the function's
    // argument will be "up," "down," "left," or "right."
    // The method will move the player to a neighboring
    // cell on the gameboard accordingly. 
    that.handleInput = function(e) {
	if( e === "up" && roomToMoveUp() ) {
	    upperLeftCorner.setY( upperLeftCorner.getY() - parameters.blockHeight );
	} 
	else if( e === "down" && roomToMoveDown() ) {
	    upperLeftCorner.setY( upperLeftCorner.getY() + parameters.blockHeight );
	} // else if
	else if( e === "left" && roomToMoveLeft() ) {
	    upperLeftCorner.setX( upperLeftCorner.getX() - parameters.blockWidth );
	} // else if
	else if( e === "right" && roomToMoveRight() ) {
	    upperLeftCorner.setX( upperLeftCorner.getX() + parameters.blockWidth );
	} // else if
    };

    // render() draws a picture of the player on the
    // gameboard during each frame of the animation.
    that.render = function() {
	ctx.drawImage(Resources.get(sprite), upperLeftCorner.getX(), upperLeftCorner.getY());
    };

    // reset() returns the player to its starting position.
    that.reset = function() {
	upperLeftCorner.setX( Math.floor(parameters.columns/2) * parameters.blockWidth );
	upperLeftCorner.setY( (parameters.rows - 1) * parameters.blockHeight );
    };

    // The code in engine.js requires that the Player class have
    // an update() method.
    // It does not appear to need update() to do anything.
    that.update = function() {
    };
    return that;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Place one Enemy on each of the 3 stony rows on the gameboard.
for( var i = 0; i < 3; i = i + 1 ) {
    var e = Enemy();
    e.setPosition(i);
    allEnemies.push(e);
} // for

// Place the player object in a variable called player.
var player = Player();

// This builds and registers the function that listens for key
// presses and sends the key codes to the Player.handleInput() method. 
// You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});