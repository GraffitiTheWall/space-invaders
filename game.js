class mainScene extends Phaser.Scene {
    constructor() {
        super('main')
        this.alien_vel = 1
        this.alien_vel_ph = 1
        this.hero_vel = 10
        this.laser_vel = 300
        this.alien_laser_vel = 350
        this.score = 0
        this.level = 1
        this.laser_spawn_interval = 500
    }
    preload() {
        this.load.image('shooter', 'assets/space_shooter.png')
        this.load.image('laser','assets/laser.png')
        this.load.image('alien', 'assets/alien.png')
        this.load.image('bullet', 'assets/bullet.png')
        this.load.image('chicken', 'assets/chicken.png')
    }
    create() {
        this.hero = this.physics.add.sprite(600 - 50, 600-20,'shooter')
        let scoreText = this.add.text(16,16,`score: ${this.score}`, {fontSize: '32px', fill: '#FFFFFF'})
        let levelText = this.add.text(16,46, `level: ${this.level}`, {fontSize: '32px', fill: '#FFFFFF'})
        this.hero.setScale(6)
        this.lasers = this.physics.add.group()
        this.aliens = this.physics.add.group()
        this.al_lasers = this.physics.add.group()
        this.hero.setGravityY(-300)
        this.hero.setCollideWorldBounds(true)
        function del_alien(alien, laser) {
            this.score += 1
            scoreText.setText(`score: ${this.score}`)
            alien.disableBody(this,this)
            laser.disableBody(this,this)
            laser.destroy()
        }
        function spawn_aliens(aliens) {
            let c = 0 
            let rows = 3
            while (c < rows) {
                for (let i = 0; i < 10; i++ ) {
                
                    aliens.create((i*75) + 150,(c*80) + 100, 'alien').setScale(5)
                    aliens.children.iterate(function(alien) {
                        alien.setGravityY(-300)
                    })
                }
                c += 1
            }
            
        }

        function stop_game() {
            clearInterval(interval)
            this.movable = false
            this.alien_vel = 0
            this.hero_vel = 0
            this.laser_vel = 0
            this.score = 0
            let button = this.add.text(1000/2 - 150,1000/2 - 150, 'play again?', {fontSize: '45px', fill: '#0f0' })
            button.setInteractive()
            button.on('pointerdown', function() {
            var highestTimeoutId = setTimeout(";");
            for (var i = 0 ; i < highestTimeoutId ; i++) {
                clearTimeout(i); 
            }
            location.reload()
        },this)
        }
        function shoot_laser(aliens,al_lasers) {
            let lst = []
            for (let i =0; i < aliens.getChildren().length; i++) {
                if (aliens.getChildren()[i].active == true) {
                    lst.push(aliens.getChildren()[i])
                }
            } 
            let rand_num = Math.floor( Math.random() * lst.length) 
            let rand_alien = lst[rand_num]
            if (rand_alien != undefined) {
                al_lasers.create(rand_alien.x, rand_alien.y + 10, 'bullet').setScale(4)
            }
        }
        this.physics.add.overlap(this.aliens,this.lasers,del_alien,null,this)
        this.physics.add.overlap(this.hero, this.al_lasers,stop_game,null,this)
        spawn_aliens(this.aliens)
        let interval = setInterval(shoot_laser, this.laser_spawn_interval,this.aliens,this.al_lasers)
        shoot_laser(this.al_lasers, this.aliens)
    }
    update() {
        this.cursors = this.input.keyboard.createCursorKeys()
        if (this.cursors.left.isDown) {
            this.hero.x -= this.hero_vel
         } if (this.cursors.right.isDown) {
            this.hero.x += this.hero_vel
        } if(Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.lasers.create(this.hero.x,this.hero.y - 50,'laser')
     
        }
        let laser_vel = this.laser_vel
        this.lasers.children.iterate(function(laser) {
            try{
                laser.setGravityY(-300)
                laser.setVelocityY(-(laser_vel))
                if (laser.y < 0) {
                    laser.destroy()
                    laser.disableBody(true,true)
                    this.lasers.getChildren().splice(lasers.getChildren().indexOf(laser), 1)
                    
                }
            } catch(error) {
                null
            }
        }) 
        let alien_laser_vel = this.alien_laser_vel
        this.al_lasers.children.iterate(function(laser) {
            try {
                laser.setVelocityY(alien_laser_vel)
                if (laser.y > 600) {
                    laser.destroy()
                }
            }
            catch(error) {
                null
            }
        })
        let f_alien = this.aliens.getChildren()[0]
        let vel_ph = this.alien_vel_ph
        let vel  = this.alien_vel
        this.aliens.children.iterate(function(alien) {
            if (alien.y > 600) {
                alien.destroy()
            }
            alien.setCollideWorldBounds(true)
            if (f_alien.x == 200) {
                vel = -(vel_ph)
                alien.y += 2  
            }
            if (f_alien.x == 50) {
                vel = vel_ph
                alien.y += 2
            }
            alien.x += vel
        }
    )
       this.alien_vel = vel

        if(this.aliens.getChildren().every(alien => alien.active==false)) {
            let text = this.add.text(50,1000/2 - 150,'Congrats! Click here to move on to the next level...', {fontSize: '30px' , fill: '#0f0'})
            text.setInteractive()
            text.on('pointerdown', () => {
                var highestTimeoutId = setTimeout(";");
                for (var i = 0 ; i < highestTimeoutId ; i++) {
                    clearTimeout(i); 
                }
                this.scene.start('main')
                this.laser_spawn_interval -= 50
                this.alien_laser_vel += 100
                this.level += 1

            })
            
        }

    }
    
}

export default mainScene;