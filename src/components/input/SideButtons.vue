<template>
  <div
    class="side-buttons">
    <div
      class="left"
      @touchstart="leftDown"
      @touchend="leftUp">
    </div>
    <div
      class="right"
      @touchstart="rightDown"
      @touchend="rightUp">
    </div>
  </div>
</template>

<script>

export default {
  name: 'side-buttons',
  emits: [
    'leftdown',
    'leftup',
    'rightdown',
    'rightup'
  ],
  setup (props, { emit }) {
    function leftDown (e) {
      emit('leftdown', {
        detail: {
          x: e.targetTouches[0].screenX,
          y: e.targetTouches[0].screenY
        }
      })
    }

    function leftUp (e) {
      emit('leftup')
    }

    function rightDown (e) {
      emit('rightdown', {
        detail: {
          x: e.targetTouches[0].screenX,
          y: e.targetTouches[0].screenY
        }
      })
    }

    function rightUp (e) {
      emit('rightup')
    }

    return {
      leftDown,
      leftUp,
      rightDown,
      rightUp
    }
  }
}
</script>

<style lang="scss" scoped>
.side-buttons {
  -webkit-touch-callout: none;
 user-select: none;
}
input,
.left,
.right {
  top: 0;
  position: absolute;
  height: 100%;
  width: 40vw;
}
.left {
  left: 0;
}
.right {
  right: 0;
}
</style>
