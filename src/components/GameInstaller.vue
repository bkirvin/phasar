<template>
  <div class="installer">
    <q-btn
      v-if="readyToInstall"
      class = "install-btn"
      color="primary"
      label="Install App"
      @click="installApp" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const readyToInstall = ref(false)
    let deferredPrompt

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      readyToInstall.value = true
    }, { passive: true })

    window.addEventListener('appinstalled', () => {
      // Hide the app-provided install promotion
      readyToInstall.value = false
      // Clear the deferredPrompt so it can be garbage collected
      deferredPrompt = null
      // Optionally, send analytics event to indicate successful install
      console.log('PWA was installed')
    }, { passive: true })

    async function installApp () {
      readyToInstall.value = false
      // Show the install prompt
      deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice
      // Optionally, send analytics event with outcome of user choice
      console.log(`User response to the install prompt: ${outcome}`)
      // We've used the prompt, and can't use it again, throw it away
      deferredPrompt = null
    }

    return {
      readyToInstall,
      installApp
    }
  }
}
</script>

<style lang="scss" scoped>
.install-btn {
  position: absolute;
  bottom: 5vh;
  right: 5vh;
  z-index: 2001
}
</style>
