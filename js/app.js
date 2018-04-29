let w = 102;
let h = 80;
// Enemies our player must avoid
var Enemy = function() {
    this.x = w;
    this.y = h;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log("update enemy "+dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.resetPlayer();
    this.score = 0;
    this.sprite = 'images/char-boy.png'
}

Player.prototype.update = function(dt) {
    //Itereate through the enemies array and detect collisions.
    allEnemies.forEach(function(enemy) {
        if (enemy.x/w === this.x/w && this.y/h === enemy.y/h) {
            this.loose();
        }
    }, this);
}

Player.prototype.handleInput = function(keyCode) {
    var currentPositionX = this.x;
    var currentPositionY = this.y;
    switch(keyCode) {
        case 'left':
            currentPositionX -= w;
            break;
        case 'up':
            currentPositionY -= h;
            break;
        case 'right':
            currentPositionX += w;
            break;
        case 'down':
            currentPositionY += h;
            break;
    }
    if (currentPositionY/h == 0) {
        this.win();
    }
    else if(!(currentPositionX/w > 4) && !(currentPositionX/w < 0) && !(currentPositionY/h < 0) && !(currentPositionY/h > 5)) {
        this.x = currentPositionX;
        this.y = currentPositionY;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.win = function() {
    this.score ++;
    console.log("Score "+this.score);
    this.resetPlayer();
}

Player.prototype.loose = function() {
    console.log("lost");
    this.resetPlayer();
}

//Locate the player on the middle of the bottom grass area. @TODO randomize X position.
Player.prototype.resetPlayer = function() {
    this.x = (Math.floor(Math.random()*5))*w;
    this.y = 5*h;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
allEnemies = [];
allEnemies[0] = new Enemy();
// Place the player object in a variable called player
player = new Player();


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
