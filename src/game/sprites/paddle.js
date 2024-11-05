import { GameObjects } from 'phaser'
import { EventBus } from 'src/game/EventBus'

export default class Paddle extends GameObjects.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y)
    // set data values
    this.setData('speed', 14)
    this.setData('move', 0)
    this.setData('limit', this.scene.GameWidth / this.data.values.speed)
    // init sprite
    this.init()
    // add sprite to scene
    scene.add.existing(this)
    // player input controls
    // touch
    EventBus.on('leftdown', (e) => {
      e.preventDefault()
      this.data.values.move = -10
    })
    EventBus.on('leftup', (e) => {
      this.data.values.move = 0
    })
    EventBus.on('rightdown', (e) => {
      e.preventDefault()
      this.data.values.move = 10
    })
    EventBus.on('rightup', (e) => {
      this.data.values.move = 0
    })
    // keyboard
    scene.input.keyboard.on('keyup-LEFT', (e) => {
      this.data.values.move = 0
    })
    scene.input.keyboard.on('keydown-LEFT', (e) => {
      if (this.data.values.move === 0) this.data.values.move = -10
    })
    scene.input.keyboard.on('keyup-RIGHT', (e) => {
      this.data.values.move = 0
    })
    scene.input.keyboard.on('keydown-RIGHT', (e) => {
      if (this.data.values.move === 0) this.data.values.move = 10
    })

    this.initPosition(x, y)
    // add sprite physics
    scene.physics.add.existing(this)
    this.body.setAllowGravity(false)
      .setCollideWorldBounds(true)
      .setImmovable(true)
      .setFriction(1)
    // create collider on data
    this.setData('collide', scene.physics.add.collider(this, scene.balls, scene.adjustAngular.bind(scene)))
    // create functions object on data to be called by parent
    this.setData('fn', {
      removeCollider: () => {
        scene.physics.world.removeCollider(this.data.values.collide)
      },
      addCollider: () => {
        this.setData('collide', scene.physics.add.collider(this, scene.balls, scene.adjustAngular.bind(scene)))
      },
      // handle game dimension derived values
      reScale: (data) => {
        // update paddle speed limit by width change ratio
        this.data.values.limit *= data.xRatio
      }
    })
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta)
    if (this.data.values.move !== 0) {
      if (Math.abs(this.data.values.move) < this.data.values.limit) this.data.values.move = Math.min(this.data.values.move * 1.1, this.data.values.limit)
    }
    this.body.setVelocityX(this.data.values.move * delta)
  }

  collide () {
    this.scene.adjustAngular()
  }

  init () {
    this.setTexture('square')
    this.setScale(8, 2)
    this.setDepth(10)
  }

  initPosition (x, y) {
    this.setPosition(x, this.scene.GameHeight - (this.displayHeight * 2))
  }

  reOrientPosition (xRatio, yRatio) {
    this.setPosition(this.x * xRatio, this.y * yRatio)
  }

  resetPosition () {
    this.setPosition(this.scene.GameWidthCenter, this.scene.GameHeight - (this.displayHeight * 2))
  }

  remove () {
    this.destroy()
  }

  kill () {
    this.remove()
  }
}
