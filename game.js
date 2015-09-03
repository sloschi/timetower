var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var platforms,
	player,
	cursors,
	stars,
	score = 0,
	scoreText;

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
	// We're going to be using physics, so enable the arcade physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	// A simple background for our game
	game.add.sprite(0, 0, 'sky');
	
	// The platforms group contains the ground and the 2 ledges we can jump on
	platforms = game.add.group();
	
	// we will enable physics for any object that is created in this group
	platforms.enableBody = true;
	
	// Here we create the ground
	var ground = platforms.create(0, game.world.height - 64, 'ground');
	
	// scale it to fit the width of the game (the original sprite is 400x32 in size)
	ground.scale.setTo(2, 2);
	
	// This stops it from falling away when you jump on it
	ground.body.immovable = true;
	
	// now let's create two ledges
	var ledge = platforms.create(400, 400, 'ground');
	
	ledge.body.immovable = true;
	
	ledge = platforms.create(-150, 250, 'ground');
	
	ledge.body.immovable = true;
	
	// the player and its settings
	player = game.add.sprite(32, game.world.height - 150, 'dude');
	
	// we need to enable physics on the player
	game.physics.arcade.enable(player);
	
	// player physics properties. give the little guy a slight bounce.
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;
	
	// our two animations, walking left and right
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	// create cursor keys
	cursors = game.input.keyboard.createCursorKeys();
	
	// adding the stars
	stars = game.add.group();
	
	stars.enableBody = true;
	
	// create 12 stars 
	for (var i = 0; i < 12; i++) {
		// create a star inside the star group
		var star = stars.create(i * 70, 0, 'star');
		
		// give the star some gravity
		star.body.gravity.y = 6;
		
		// add a random bounce value
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}
	
	// create score text
	scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});
}

function update() {
	// collide the player with the platforms and stars
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.overlap(player, stars, collectStar, null, this);
	
	// reset the players velocity
	player.body.velocity.x = 0;
	
	if (cursors.left.isDown) {
		// move left
		player.body.velocity.x = -150;
		player.animations.play('left');
	} else if (cursors.right.isDown) {
		// move right
		player.body.velocity.x = 150;
		player.animations.play('right');
	} else {
		// stand still
		player.animations.stop();
		player.frame = 4;
	}
	
	// allow the player to jump if they are touching the ground
	if (cursors.up.isDown && player.body.touching.down) {
		player.body.velocity.y = -350;
	}
}

function collectStar(player, star) {
	// remove the star
	star.kill();
	
	// update score
	score += 10;
	scoreText.text = 'Score: ' + score;
}