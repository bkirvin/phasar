<template>
  <q-layout>
    <q-page-container style="height: 100vh;">
      <game-orientation />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import orient from 'src/game/orientation'
import GameOrientation from 'src/components/GameOrientation.vue'

orient.setOrientation('any') // 'landscape', 'portrait', 'any'

export default {
  name: 'MainLayout',
  components: {
    GameOrientation
  }
}
</script>
