Game.Level1 = function (aGame) { };

var map;
var layer;

var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;

Game.Level1.prototype = {
    create: function () {
        this.stage.backgroundColor = '#3A5963';

        this.physics.arcade.gravity.y = 1400;

        map = this.add.tilemap('map', 64, 64);

        map.addTilesetImage('maptileset');

        layer = map.createLayer(0);

        layer.resizeWorld();

        map.setCollisionBetween(0, 0);

        player = this.add.sprite(100, 560, 'player');
        player.anchor.setTo(0.5, 0.5);

        player.animations.add('idle', [0, 1], 1, true);
        player.animations.add('jump', [2], 1, true);
        player.animations.add('run', [3, 4, 5, 6, 7, 8], 7, true);
        this.physics.arcade.enable(player);
        this.camera.follow(player);
        player.body.collideWorldBounds = true;

        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W)
        };
    },

    update: function () {
        this.physics.arcade.collide(player, layer);

        player.body.velocity.x = 0;

        if (controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer) {
            player.animations.play('jump');
            player.body.velocity.y = -600;
            jumpTimer = this.time.now + 750;
        } else if (controls.right.isDown) {
            player.animations.play('run');
            player.scale.setTo(1, 1);
            player.body.velocity.x += playerSpeed;
        } else if (controls.left.isDown) {
            player.animations.play('run');
            player.scale.setTo(1, 1);
            player.body.velocity.x -= playerSpeed;
        } else {
            player.animations.play('idle');
            player.scale.setTo(1, 1);
        }
    }
};