import mainScene from '/space-invaders/game.js'
import startScene from '/space-invaders/start.js'
var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    backgroundColor: 0x17161a,
    scene: [startScene,mainScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
};

export { config }