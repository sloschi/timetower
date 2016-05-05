Game.Player = function (aGame, aPosX, aPosY, aSpriteName){
    Game.Prefab.call(this, aGame, aPosX, aPosY, aSpriteName);

    this.gameState = aGame;
    this.playerSpeed = 180;
    this.jumpTimer = 0;

    aGame.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.animations.add('idle', [0,1], 1,true);
    this.animations.add('jump', [2], 1,true);
    this.animations.add('run', [3,4,5,6,7,8], 7,true);

    this.anchor.setTo(0.5,0.5);

    aGame.input.gamepad.start();
    this.pad1 = aGame.input.gamepad.pad1;
    console.log('created player');
};

Game.Player.prototype = Object.create(Game.Prefab.prototype);

Game.Player.prototype.constructor = Game.Player;

Game.Player.prototype.update = function () {
    this.body.velocity.x = 0;

    //move left
    if(this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1){
        console.log('moving left');
        this.animations.play('run');
        this.scale.setTo(-1, 1);
        this.body.velocity.x += this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) * this.playerSpeed;
    }

    //move right
    if (this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)) {
        this.animations.play('run');
        this.scale.setTo(1, 1);
        this.body.velocity.x += this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) * this.playerSpeed;
    }

    //jump
    if(this.pad1.justPressed(Phaser.Gamepad.XBOX360_A) && (this.body.onFloor() || this.body.touching.down) && this.gameState.time.now > this.jumpTimer) {
        this.animations.play('jump');

        this.body.velocity.y = -600;
        this.jumpTimer = this.gameState.time.now + 750;
    }

    //idle
    if(player.body.velocity.x === 0 && player.body.velocity.y === 0){
        player.animations.play('idle');
    }
};