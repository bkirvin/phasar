<template>
  <transition name="scoredown">
    <div
      v-if="start && computerScore !== 10"
      class="player">
      <span>Player: </span>
      <span class="score">{{ playerScore }}</span>
    </div>
  </transition>
  <transition name="scoredown">
    <div class="level" v-if="start">
      <span>Level: </span>
      <span class="score">{{ level }}</span>
    </div>
  </transition>
  <transition name="scoredown">
    <div
      v-if="start && playerScore !== 10"
      class="computer">
      <span>Computer: </span>
      <span class="score">{{ computerScore }}</span>
    </div>
  </transition>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { EventBus } from 'src/game/EventBus'

export default {
  name: 'game-score',
  setup () {
    const data = reactive({
      playerScore: 0,
      computerScore: 0,
      level: 1,
      start: false
    })

    onMounted(() => {
      EventBus.on('score', e => {
        Object.keys(e.detail).forEach(key => {
          data[key] = e.detail[key]
        })
      })
      EventBus.on('started', () => {
        data.start = true
      })
    })

    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.player,
.computer,
.level {
  color: #ffffff7d
}
.player {
  position: absolute;
  top: 2vh;
  left: 10vw;
}
.computer {
  position: absolute;
  top: 2vh;
  right: 10vw;
}
.level {
  position: absolute;
  top: 2vh;
  left: 50%;
  transform: translate(-50%, 0);

}
.score {
  font-size: 2em;
}
.scoredown-enter-active {
  transition: top 1s ease;
}
.scoredown-leave-active {
  transition: top 0.5s ease;
}
.scoredown-enter-from,
.scoredown-leave-to {
  top: -20vh;
}
</style>
