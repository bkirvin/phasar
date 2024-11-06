<script setup>
import PhaserGame from 'src/game/PhaserGame.vue'
import GameInstaller from 'src/components/GameInstaller.vue'
import SideButtons from 'src/components/input/SideButtons.vue'
import GameScore from 'src/components/GameScore.vue'
import GameChip from 'src/components/GameChip.vue'
import { ref, toRaw } from 'vue'

const phaserRef = ref()

// SCENE ACCESS FUNCTION EXAMPLES FROM PHASER TEAM

// const changeScene = () => {
//   const scene = toRaw(phaserRef.value.scene)

//   if (scene) {
//     //  Call the methods defined in Scenes
//     scene.changeScene()
//   }

// }

const moveSprite = (sprite, vel) => {
  const scene = toRaw(phaserRef.value.scene)

  if (scene) {
    scene[sprite].data.values.move = vel
  }
}

// const addSprite = () => {
//   const scene = toRaw(phaserRef.value.scene)

//   if (scene) {
//     //  Add a new sprite to the current scene at a random position
//     // const x = Phaser.Math.Between(64, scene.scale.width - 64)
//     // const y = Phaser.Math.Between(64, scene.scale.height - 64)

//     //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
//     const star = scene.add.sprite(x, y, 'star')

//     //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
//     //  You could, of course, do this from within the Phaser Scene code, but this is just an example
//     //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
//     scene.add.tween({
//       targets: star,
//       duration: 500 + Math.random() * 1000,
//       alpha: 0,
//       yoyo: true,
//       repeat: -1
//     })
//   }
// }

// END SCENE ACCESS FUNCTION EXAMPLES

const currentScene = (scene) => {
  // configure scene
  console.log('CURRENT SCENE', scene)
}
const leftDown = () => {
  moveSprite('paddle', -10)
}

const leftUp = () => {
  moveSprite('paddle', 0)
}
const rightDown = () => {
  moveSprite('paddle', 10)
}
const rightUp = () => {
  moveSprite('paddle', 0)
}

</script>

<template>
  <game-score />
  <game-chip />
  <game-installer />
  <side-buttons @leftdown="leftDown" @leftup="leftUp" @rightdown="rightDown" @rightup="rightUp" />
  <phaser-game  ref="phaserRef" @current-active-scene="currentScene"/>
</template>

<style lang="scss">
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background-color: #333;
}
</style>
