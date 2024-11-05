<template>
  <div class="independent">
    <transition name="slideup">
      <q-chip
        v-if="ready"
        class="game-chip"
        text-color="white">
        {{ message }}
      </q-chip>
    </transition>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { EventBus } from 'src/game/EventBus'

export default {
  name: 'game-chip',
  setup () {
    const data = reactive({
      ready: false,
      message: ''
    })

    onMounted(() => {
      EventBus.on('showchip', e => {
        Object.keys(e.detail).forEach(key => {
          data[key] = e.detail[key]
        })
      })
    })

    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.independent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.game-chip {
  padding: 5vh;
  border: 2px solid red;
  font-size: 3em;
  border-radius: 10vh;
  font-weight: 800;
  margin-top: 1vh;
  color: red !important;
  background-color: yellow !important;
}

.slideup-enter-active {
  transition: margin-top 1s ease;
}
.slideup-leave-active {
  transition: margin-top 0.3s ease;
}
.slideup-enter-from,
.slideup-leave-to {
  margin-top: 120vh;
}
</style>
