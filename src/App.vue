<template>
  <router-view />
  <div class="version">
    <small>{{  version  }}</small>
  </div>
</template>

<script setup>
// import { onMounted } from 'vue'
import { version } from '../package.json'

// function createDoubleTapPreventer (timeoutMs) {
//   let dblTapTimer = 0
//   let dblTapPressed = false

//   return function (e) {
//     clearTimeout(dblTapTimer)
//     if (dblTapPressed) {
//       e.preventDefault()
//       dblTapPressed = false
//     } else {
//       dblTapPressed = true
//       dblTapTimer = setTimeout(() => {
//         dblTapPressed = false
//       }, timeoutMs)
//     }
//   }
// }

// onMounted(() => {
//   document.body.addEventListener('touchstart', createDoubleTapPreventer(500), { passive: false })
// })
defineOptions({
  name: 'App'
})
</script>

<style lang="scss">
body {
  user-select: none;
}
.version {
  position: absolute;
  bottom: 0;
  right: 5vw;
  color: #555;
  padding: 5px;
}
</style>
