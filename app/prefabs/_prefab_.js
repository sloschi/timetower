Game.Prefab = function (aGame, aPosX, aPosY, aSpriteName) {
    "use strict";
    Phaser.Sprite.call(this, aGame.game, aPosX, aPosY, aSpriteName);
    console.log('created prefab with spritename: ', aSpriteName);
    console.log('created prefab at X: ' + aPosX + ' Y: ' + aPosY);
};

Game.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
Game.Prefab.prototype.constructor = Game.Prefab;