Game.Preloader = function (aGame) {
    this.preloadscreen = null;
};

Game.Preloader.prototype = {
    preload: function () {
        this.preloadscreen = this.add.sprite(this.world.centerX, this.world.center, 'preloadScreen');
        this.preloadscreen.anchor.setTo(0.5, 0.5);

        this.time.advancedTiming = true;

        this.load.setPreloadSprite(this.preloadscreen);

        //load assets etc
    },

    create: function () {
        this.state.start('Level1');
    }
};