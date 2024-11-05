import { Scene } from 'phaser'
import { EventBus } from 'src/game/EventBus'

export class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('ball', './img/ball_small.png')
    this.load.image('ember', './img/ember.png')
    this.load.image('square', './img/square.png')
    this.load.audio('serve', ['./sound/serve.mp3', './sound/serve.ogg'])
    this.load.audio('bounce', ['./sound/bounce.mp3', './sound/bounce.ogg'])
  }

  create () {
    this.scene.start('PlayScene')
    EventBus.emit('started')
  }
}
