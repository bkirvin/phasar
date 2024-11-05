import { GameObjects } from 'phaser'

export default class Example extends GameObjects.Sprite {
  constructor (scene, data) {
    super(scene, data.x, data.y)
    this.scene = scene
    this.setTexture('')
    // gameobject init values
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta)
    // object behavior logic
  }

  remove () {
    this.scene.kill(this.scene.bubbles, this)
  }

  kill () {
    // pre process game object removal
    this.remove()
  }
}
