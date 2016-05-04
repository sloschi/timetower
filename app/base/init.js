var game = new Phaser.Game(800,600, Phaser.CANVAS, '');

game.state.add('Boot', Game.boot);
game.state.add('Preloader', Game.Preloader);
game.state.add('MainMenu', Game.MainMenu);
game.state.add('Level1', Game.Level1);

game.state.start('Boot');