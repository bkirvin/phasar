import { Physics, Math } from 'phaser'

export default class Ball extends Physics.Arcade.Sprite {
  constructor (scene, data) {
    super(scene, data.x, data.y)
    scene.physics.add.existing(this)
    this.scene = scene
    this.setData('init', (data) => {
      this.init(data)
    })
    this.init(data)
  }

  init (data) {
    this
      .setData('scoring', 0)
      .setTexture('ball')
    this.body
      .setBounce(1)
      .setVelocity(data.ballVelocity)
      .setCircle(5)
      .setGravityY(data.level * 100)
      .setCollideWorldBounds(true)
    this.body.onWorldBounds = true
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta)
    if (this.y > this.scene.GameHeight) {
      if (!this.scene.endGame) {
        this.scene.computerScore++
        this.scene.updateScore()
        this.serveBall()
        this.scene.checkWin()
      }
    }
  }

  serveBall () {
    this.data.values.scoring = 0
    this.scene.serveBall()
    this
    // eslint-disable-next-line no-undef
      .setX(Math.Between(1, this.scene.GameWidth))
      .setY(-this.displayHeight)
    // eslint-disable-next-line no-undef
      .setVelocity(this.scene.ballVelocity, Math.Between(100, this.scene.ballVelocity))
  }

  remove () {
    this.scene.kill(this.scene.bubbles, this)
  }

  kill () {
    // pre process game object removal
    this.remove()
  }
}
