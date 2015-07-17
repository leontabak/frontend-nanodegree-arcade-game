// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var obj = Object.create(Enemy.prototype);
    this.x = 0;
    this.y = 0;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    obj.sprite = 'images/enemy-bug.png';
    return obj;
};

Enemy.prototype.whoami = function() {
  console.log( "I am an enemy." );
};

Enemy.prototype.getimage = function() {
    //return Resources.get(this.sprite);
    return this.sprite;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 1;
    this.y += 1;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    var obj = Object.create(Enemy.prototype);
    this.x = 200;
    this.y = 200;
    this.sprite = 'images/char-boy.png';
    return obj;
} 

Player.prototype.update = function() {
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function() {
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var e = new Enemy();
console.log( typeof e );
allEnemies.push(e);
var i;
for( i = 0; i < allEnemies.length; i += 1 ) {
    allEnemies[i].whoami();
    var pic = allEnemies[i].getimage();
    console.log( pic );
} // for
var player = new Player();



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
