
var constants = {
    rows : 6,
    columns : 5,
    blockWidth : 101,
    blockHeight : 83,
    worldWidth : 5 * 101,
    worldHeight : 6 * 83
};

// Enemies our player must avoid
var Enemy = function() {
    var x = 0;
    var y = 0;
    var speed = 1 + Math.floor(Math.random() * 3);
    var sprite = "images/enemy-bug.png";

    var that = {};
    that.render = function() {
	ctx.drawImage(Resources.get(sprite),x,y);
    };
    that.setPosition = function( row ) {
	x = Math.floor( 5 * Math.random()) * constants.blockWidth;
	y = constants.blockHeight + row * constants.blockHeight;
    };
    that.update = function(dt) {
	if( x > constants.worldWidth ) {
	    x = 0;
	} // if
	else {
	    x = x + dt * speed * 100;
	} // else
	y = y;
    };
    return that;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    var x = Math.floor(constants.columns/2) * constants.blockWidth;
    var y = (constants.rows - 1) * constants.blockHeight;
    var sprite = "images/char-boy.png";
    var reset = function() {
	x = Math.floor(constants.columns/2) * constants.blockWidth;
	y = (constants.rows - 1) * constants.blockHeight;
    };
    var roomToMoveUp = function() {
	return y > 0;
    };
    var roomToMoveDown = function() {
	return y < (constants.rows - 1) * constants.blockHeight;
    };
    var roomToMoveLeft = function() {
	return x > 0;
    };
    var roomToMoveRight = function() {
	return x < (constants.columns - 1) * constants.blockWidth;
    };

    var that = {};
    that.handleInput = function(e) {
	if( e === "up" && roomToMoveUp() ) {
	    y = y - constants.blockHeight;
	} 
	else if( e === "down" && roomToMoveDown() ) {
	    y = y + constants.blockHeight;
	} // else if
	else if( e === "left" && roomToMoveLeft() ) {
	    x = x - constants.blockWidth;
	} // else if
	else if( e === "right" && roomToMoveRight() ) {
	    x = x + constants.blockWidth;
	} // else if
    };
    that.render = function() {
	ctx.drawImage(Resources.get(sprite), x, y);
    };
    that.update = function() {
    };
    return that;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for( var i = 0; i < 3; i = i + 1 ) {
    var e = Enemy();
    e.setPosition(i);
    allEnemies.push(e);
} // for
var player = Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
