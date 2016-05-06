Game.Level1 = function (aGame) {};

var map;
var layer;
var player;

Game.Level1.prototype = {
    create: function () {
        this.stage.backgroundColor = '#3A5963';

        //map
        this.physics.arcade.gravity.y = 1400;
        map =  this.add.tilemap('map', 64,64);
        map.addTilesetImage('maptileset');
        layer = map.createLayer(0);
        layer.resizeWorld();
        map.setCollisionBetween(0,0);

        //prefabs
        var prefab;
        player = new Game.Player(this, 100, 560, 'player');
        this.add.existing(player);

        this.camera.follow(player);

    }, 
    
    update: function () {
        this.physics.arcade.collide(player, layer);
    }
};