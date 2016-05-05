Game.Level1 = function (aGame) {};

var map;
var layer;

var player;
var controls = {};
var playerSpeed = 180;
var jumpTimer = 0;

var pad1;

Game.Level1.prototype = {
    create: function () {
        this.stage.backgroundColor = '#3A5963';

        this.physics.arcade.gravity.y = 1400;

        map =  this.add.tilemap('map', 64,64);

        map.addTilesetImage('maptileset');

        layer = map.createLayer(0);

        layer.resizeWorld();

        map.setCollisionBetween(0,0);

        player = this.add.sprite(100,560, 'player');
        player.anchor.setTo(0.5,0.5);

        player.animations.add('idle', [0,1], 1,true);
        player.animations.add('jump', [2], 1,true);
        player.animations.add('run', [3,4,5,6,7,8], 7,true);
        this.physics.arcade.enable(player);
        this.camera.follow(player);
        player.body.collideWorldBounds = true;

        this.input.gamepad.start();
        pad1 = this.input.gamepad.pad1;


        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W)
        };
    }, 
    
    update: function () {
        this.physics.arcade.collide(player, layer);

        player.body.velocity.x = 0;

        //move left
        if(pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1){
            player.animations.play('run');
            player.scale.setTo(-1, 1);
            player.body.velocity.x += pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) * playerSpeed;
        }

        //move right
        if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)) {
            player.animations.play('run');
            player.scale.setTo(1, 1);
            player.body.velocity.x += pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) * playerSpeed;
        }

        //jump
        if(pad1.justPressed(Phaser.Gamepad.XBOX360_A) && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer) {
            player.animations.play('jump');

            player.body.velocity.y = -600;
            jumpTimer = this.time.now + 750;
        }

        //idle
        if(player.body.velocity.x === 0 && player.body.velocity.y === 0){
            player.animations.play('idle');
        }
    }
};