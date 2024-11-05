import { BootScene } from './scenes/BootScene'
import { PlayScene } from './scenes/PlayScene'
import Phaser from 'src/game/usePhaser'
import orient from './orientation'

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: orient.getScale(),
    parent: 'game-container',
    width: orient.getWidth(),
    height: orient.getHeight()
  },
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300
      },
      checkCollision: {
        down: false
      },
      debug: false
    }
  },
  // uncomment to activate plugin
  // plugins: {
  //   scene: [
  //     {
  //       key: 'DebugDrawPlugin',
  //       plugin: DebugDrawPlugin,
  //       mapping: 'debugDraw'
  //     }
  //   ]
  // },
  scene: [BootScene, PlayScene]
}

const StartGame = (parent) => {
  return new Phaser.Game({ ...config, parent })
}

export default StartGame
