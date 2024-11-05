import {
  Scene,
  Math,
  Scale
} from 'phaser'
import orient from '../orientation'
import { EventBus } from 'src/game/EventBus'
import { useGraphics } from '../graphics'
import Paddle from '../sprites/paddle'
import { useEmitters } from '../emitters'
import Ball from '../sprites/physics/ball'

const { mitter } = useEmitters()
const { buildBg } = useGraphics()

export class PlayScene extends Scene {
  constructor () {
    super({
      key: 'PlayScene'
    })
  }

  create () {
    this.setGameDimensions(this.sys.game.scale.gameSize)
    buildBg(this)
    // init scene variables
    this.playerScore = 0
    this.computerScore = 0
    this.maxScore = 10
    this.ballSpeed = 5
    this.level = 1
    this.endGame = false
    this.ballVelocity = (this.GameWidth + this.GameHeight) / this.ballSpeed

    // add game sounds
    this.sound.add('serve')
    this.sound.add('bounce')

    // add listeners for Vue HTML components
    EventBus.on('resuming', (e) => {
      if (this.endGame) this.restart()
      else this.scene.resume()
    })

    // handle orientation changes
    this.scale.on('resize', this.resize, this)
    this.scale.on('orientationchange', this.checkOrientation, this)

    EventBus.on('orient', (e) => {
      if (!e.detail.show) this.scene.pause()

      const data = {
        detail: {
          showResume: e.detail.show
        }
      }
      EventBus.emit('promptResume', data)
    })

    // create game object group set to custom arcade sprite class
    // implemented as an example for multiple game objects
    this.balls = this.add.group({
      classType: Ball, // specify custom sprite classes here or use Phaser.GameObjects.Sprite/Phaser.GameObjects.Image
      maxSize: 1 // increase value for multiple group objects pool
    })
    this.balls.setDepth(100)

    let data = {
      x: Math.Between(1, this.GameWidth),
      y: -10,
      ballVelocity: this.ballVelocity,
      level: this.level
    }
    this.addBall(data)

    // add player paddle
    this.paddle = new Paddle(this, this.GameWidthCenter, this.GameHeight)

    // add emitters
    this.emitters = []
    this.emitters.push(mitter('ember', 'create', this))
    this.emitters.push(mitter('rocket', 'create', this))

    // check world collision on each side
    this.physics.world.on('worldbounds', this.score, this)
    // initial screen orientation check
    orient.constrainScreen()

    // init start button
    this.scene.pause()
    data = {
      detail: {
        showResume: true
      }
    }
    EventBus.emit('promptResume', data)
    EventBus.emit('current-scene-ready', this)
  }

  // detect world boundary collisions separately
  score (body, up, down, left, right) {
    if (!this.endGame) {
      if (body) {
        // detect specific object by key
        if (body.gameObject.texture.key === 'ball') {
          const scoring = body.gameObject.data.values.scoring
          if (up && scoring) {
            this.sound.play('bounce', { volume: 0.75 })
            mitter('ember').stop()
            if (scoring < 2) {
              body.gameObject.data.values.scoring++
              this.playerScore++
            }
          }
          if (left || right) {
            this.sound.play('bounce', { volume: 0.75 })
            mitter('ember').stop()
            if (scoring && scoring < 2) {
              body.gameObject.data.values.scoring++
              this.computerScore++
            }
          }
          this.updateScore()
          this.checkWin()
        }
      }
    }
  }

  // check if game is over and who won
  checkWin () {
    // check for game over
    if (this.playerScore === this.maxScore || this.computerScore === this.maxScore) {
      // stop paddle collision with ball
      this.paddle.data.values.fn.removeCollider()

      this.endGame = true
      this.paddle.setAlpha(0.2)
      // check if player won, otherwise computer won
      const playerWon = this.playerScore === this.maxScore
      if (playerWon) mitter('rocket').explode()
      // update feedback in Vue component
      const chipData = {
        detail: {
          ready: true,
          message: playerWon ? 'Level Complete!' : 'Game Over!'
        }
      }
      // dispatch Vue compnent events
      EventBus.emit('showchip', chipData)
      const data = {
        detail: {
          showResume: true
        }
      }
      EventBus.emit('promptResume', data)
    }
  }

  // set game size values
  setGameDimensions (gameSize) {
    this.GameWidth = gameSize.width
    this.GameHeight = gameSize.height
    this.GameWidthCenter = gameSize.width * 0.5
    this.GameHeightCenter = gameSize.height * 0.5
  }

  // inactivate object in group
  kill (group, obj) {
    group.killAndHide(obj)
  }

  // spawn group child
  addBall (data) {
    const ball = this.balls.get(data)
    if (!ball) return
    ball.data.values.init(data)
    ball
      .setActive(true)
      .setVisible(true)
  }

  update () {
    orient.constrainScreen()
    // game run logic
  }

  // serve next ball
  serveBall () {
    mitter('ember').stop()
    if (!this.balls.getTotalUsed()) {
      const data = {
        // eslint-disable-next-line no-undef
        x: Math.Between(1, this.GameWidth),
        y: -10,
        ballVelocity: this.ballVelocity,
        level: this.level
      }
      this.addBall(data)
    }
    this.balls.children.iterate(ball => {
      ball.data.values.scoring = 0
    })
  }

  // update score to Vue component
  updateScore () {
    const data = {
      detail: {
        playerScore: this.playerScore,
        computerScore: this.computerScore,
        level: this.level
      }
    }
    EventBus.emit('score', data)
  }

  // modify ball direction by impact location on paddle
  adjustAngular () {
    if (!this.endGame) {
      mitter('ember').start()
      this.sound.play('serve', { volume: 0.75 })
      this.balls.children.iterate(ball => {
        ball.data.values.scoring = 1
        const b = (ball.x - this.paddle.x) * 10
        ball.setVelocityX(ball.body.velocity.x + b)
      })
    }
  }

  // adjust game to changed game size
  resize (gameSize, baseSize, displaySize, resolution) {
    if (gameSize && gameSize.width) {
      const { width, height } = gameSize
      const xRatio = width / this.GameWidth
      const yRatio = height / this.GameHeight

      const toReposition = ['Sprite']
      const scrnItems = this.children.list.filter(x => toReposition.includes(x.type))

      scrnItems.forEach(item => {
        // check if item has own reScale function
        if (item.data.values.fn && item.data.values.fn.reScale) {
          const data = {
            xRatio,
            yRatio
          }
          item.data.values.fn.reScale(data)
        }
        item.setX(item.x * xRatio)
        item.setY(item.y * yRatio)
      })

      this.cameras.resize(width, height)

      this.physics.world.setBounds(0, 0, width, height, true, true, true, false)

      buildBg(this)

      this.setGameDimensions(gameSize)

      this.emitters.forEach(emitter => {
        mitter(emitter.name, 'resize')
      })

      if (orient.isAndroid()) {
        if (gameSize.width !== orient.getWidth()) {
          this.switchScale(this.sys.game.scale)
        }
      }

      orient.constrainScreen()
    } else {
      setTimeout(() => {
        return this.resize(this)
      }, 500)
    }
  }

  switchScale (gameScale) {
    switch (orient.getName()) {
      case 'landscape':
        this.sys.game.scale.setGameSize(orient.getWidth(), orient.getHeight())
        // eslint-disable-next-line no-undef
        gameScale.updateScale(Scale.WIDTH_CONTROLS_HEIGHT)
        break
      case 'portrait':
        this.sys.game.scale.setGameSize(orient.getWidth(), orient.getHeight())
        // eslint-disable-next-line no-undef
        gameScale.updateScale(Scale.HEIGHT_CONTROLS_WIDTH)
        break
      default:
        this.sys.game.scale.setGameSize(orient.getWidth(), orient.getHeight())
        if (window.innerWidth > window.innerHeight) {
          // eslint-disable-next-line no-undef
          gameScale.updateScale(Scale.HEIGHT_CONTROLS_WIDTH)
        } else {
          // eslint-disable-next-line no-undef
          gameScale.updateScale(Scale.WIDTH_CONTROLS_HEIGHT)
        }
        this.scene.pause()
    }
  }

  checkOrientation (orientation) {
    const data = {
      detail: {
        showResume: true
      }
    }
    EventBus.emit('promptResume', data)
    orient.constrainScreen()
  }

  restart () {
    this.endGame = false
    this.paddle.setAlpha(1)
    const data = {
      detail: {
        ready: false,
        message: ''
      }
    }
    EventBus.emit('showchip', data)
    if (this.playerScore === this.maxScore) {
      this.level++
      this.ballSpeed *= 0.9
      this.ballVelocity = (this.GameWidth + this.GameHeight) / this.ballSpeed
      this.balls.children.iterate(ball => {
        ball.setGravityY(this.level * 100)
      })
    } else {
      this.level = 1
      this.ballSpeed = 5
      this.balls.children.iterate(ball => {
        this.kill(this.balls, ball)
      })
    }
    this.playerScore = 0
    this.computerScore = -1
    this.paddle.data.values.fn.addCollider()
    this.updateScore()
    this.serveBall()
    this.scene.resume()
  }
}
