// ..Enemies our player must avoid
const Enemy = function() {
    // Visible pixels 96 x 65

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset(); // Using a helper method to set new enemy's initial speed and location
};

Enemy.prototype.reset = function() {
    const yRandom = function() { // IIFE returning a random Y location out of the three possible options
        const yLocations = [56, 139, 222],
            i = Math.floor(Math.random() * 3);
        return yLocations[i];
    }();

    const sRandom = function() { // IIFE returning a random value with a minimum of 100 to be used as speed
        return Math.random() * 500 + 100;
    }();

    this.x = -99;
    this.y = yRandom;
    this.speed = sRandom;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 502) {
        this.reset(); // Resetting enemy's location once gone off the canvas
    }

    // Collision detection
    if (player.x + 75 > this.x &&
        player.x - 75 < this.x &&
        player.y + 65 > this.y &&
        player.y - 65 < this.y) {
        player.reset();
        // Once a the player collides with an enemy,
        // the game is reset and the player moves back to the start square
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    // Visible pixels 66 x 75

    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 380;
};

Player.prototype.update = function(dt) {
    if (this.y < 0) { // Reset player's position once reached water (game won)
        setTimeout(function() { // ..adding a slight delay to make sure we can see we actually won and not hit by a bug
            player.reset();
        }, 300);
    }
};

Player.prototype.render = function() {
    Enemy.prototype.render.call(this); // Calling enemy's render function on player binding 'this' to player
};

Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x > 0) { // Additional criteria checks are there to prevent player going off canvas
        this.x -= 101;
    }
    if (key == 'right' && this.x < 404) {
        this.x += 101;
    }
    if (key == 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (key == 'down' && this.y < 380) {
        this.y += 83;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [],
    enemy;

const numEnemies = 5; // Fixed enemy count in this version of my frogger

for (enemy = 0; enemy < numEnemies; enemy++) {
    const enemy = new Enemy();
    allEnemies.push(enemy);
}

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
