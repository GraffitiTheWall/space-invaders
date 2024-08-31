class startScene extends Phaser.Game {
    constructor() {
        super('start')
    }
    preload() {

    }
    create() {
        let string = 'Intructions: Press the right arrow to turn right.\nPress the left arrow to turn left.\nPress the up arrow to shoot.\n\nKill all the aliens.\nWatch out, as they will try to kill you back!\n\nGood luck, young galactic warrior!'
        let text = this.add.text(100/2, 1000/2-300, '', {fontSize:'32px',fill:'#0f0'})
        function typewrite(string, text) {
            let n_string = ''
            for (let i = 0; i < string.length; i++) {
                n_string += string[i]
                let x = n_string
                setTimeout(() => {text.setText(x)}, i*50, i)
            }
        }
        typewrite(string, text)
        let button;
        let timeout = setTimeout(() => {button = this.add.text(1000/2 - 50,1000/2,'play',{fontSize: '45px',fill:'#0f0'}); button.setInteractive(); button.on('pointerdown', () => {this.scene.start('main')})}, 10900)
        let skip = this.add.text(16,16, 'skip', {fontSize: '32px', fill: '#0f0'})
        skip.setInteractive()
        skip.on('pointerdown', () => {
            var highestTimeoutId = setTimeout(";");
            for (var i = 0 ; i < highestTimeoutId ; i++) {
                clearTimeout(i); 
            }
            this.scene.start('main')
        }
        )

    }
    update() {

    }
}

export default startScene;