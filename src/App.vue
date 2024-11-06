<template>
  <router-view />
  <div class="version">
    <small>{{  version  }}</small>
  </div>
</template>

<script setup>
import { version } from '../package.json'
defineOptions({
  name: 'App'
})
</script>

<style lang="scss">
body {
  -webkit-touch-callout: none;
  -webkit-user-callout: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-modify: none;
  -webkit-highlight: none;
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
