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
