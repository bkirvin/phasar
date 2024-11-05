<template>
  <transition name="slideup">
    <div
      v-if="showOrientation"
      class="reorient" >
      <q-icon
        size="xl"
        class="orient"
        :class="{ animicon: showOrientation }"
        :name="iconName"/>
      <h5>{{ orientation.toUpperCase() }} orientation required to play</h5>
    </div>
  </transition>
  <q-btn
    v-if="showResume"
    :test="showResume"
    round
    size="xl"
    class = "resume-btn"
    color="primary"
    icon="not_started"
    @click="resumeApp">
  </q-btn>

</template>

<script>
import { ref, reactive, computed, toRefs } from 'vue'
import orient from 'src/game/orientation'
import { EventBus } from 'src/game/EventBus'

export default {
  emits: [
    'resuming'
  ],
  setup (props, { emit }) {
    const data = reactive({
      showResume: false,
      showOrientation: false
    })
    const orientation = ref('any')

    const iconName = computed(() => {
      const icon = 'stay_current_'
      if (orientation.value === 'landscape') return icon + 'portrait'
      return icon + 'landscape'
    })

    const ntvl = setInterval(() => {
      orient.constrainScreen()
    }, 500)

    function resumeApp () {
      EventBus.emit('resuming')
      data.showResume = false
      clearInterval(ntvl)
    }
    orientation.value = orient.getName()
    EventBus.on('promptResume', e => {
      data.showResume = e.detail.showResume
    })
    EventBus.on('showOrientation', e => {
      Object.keys(e.detail).forEach(key => {
        data[key] = e.detail[key]
      })
    })

    return {
      ...toRefs(data),
      orientation,
      resumeApp,
      iconName
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  position: absolute;
  top: 2vh;
  left:2vh;
  z-index: 500;
}
.q-page-container {
  background-color: black;
}
.resume-btn {
  position: absolute;
  left: 80vw;
  bottom: 5vh;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.reorient {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: 100%;
  color: white;
  z-index: 10;
  text-align: center;
  padding: 40px;
  background-color: #222;
}
.animicon {
  animation-name: pulse;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.orient {
  font-size: 200px !important;
}

@keyframes pulse {
  from {color: rgba(0,0,0,0); transform: rotate(0deg);}
  to {color: orange; transform: rotate(90deg);}
}
.slideup-enter-active,
.slideup-leave-active {
  transition: bottom 0.5s ease;
}
.slideup-enter-from,
.slideup-leave-to {
  bottom: 100%;
}
</style>
