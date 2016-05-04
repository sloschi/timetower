var Game = {};

Game.boot = function (aGame) {};

Game.boot.prototype = {
    init: function () {
        //no multitouch (for now)
        this.input.maxPointers = 1;

        //no tab out
        this.stage.disableVisibilityChange = true;
    },

    preload: function () {
        this.load.image('preloadScreen', './assets/preloader.png');
    },

    create: function () {
        //start state "Preloader" as defined in init.js
        this.state.start('Preloader');
    }
};