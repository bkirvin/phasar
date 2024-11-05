<template>
  <div
    class="about"
    @click="skip">
    <h5>Credits</h5>
    <div
      class="creds">
      <div class="item phaser">
        <img src="/img/phaser_cred.png" alt="Phaser3" />
      </div>
      <div class="item">
        <img src="/img/quasar_cred.jpeg" alt="Quasar-Vue3" />
      </div>
    </div>
    <p>A development setup for creating Phaser3 2D games with Vue3 and Quasar. Build fast, deploy anywhere.</p>
    <div class="not-button">Press to Begin</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import orient from 'src/game/orientation'
import { EventBus } from 'src/game/EventBus'

export default {
  name: 'dev-credits',
  setup () {
    const router = useRouter()

    function skip () {
      if (orient.orientationMatch()) router.push('/game')
    }

    onMounted(() => {
      const data = {
        detail: {
          showResume: false
        }
      }
      EventBus.emit('promptResume', data)
    })

    return {
      skip
    }
  }
}
</script>

<style lang="scss" scoped>

.not-button {
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 800;
  text-align: center;
}
.creds {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.port {
  flex-direction: column;
}
.item {
  width: 25vw;
  margin: 2vw;
}
.markus {

  img {
    border: 1px solid #aaa;
    border-radius: 50%;
    width:10vw;
  }
}

.about {
  position:absolute;
  width: 100%;
  background-color: #222;
  height: 100%;
  color: #eee;
  opacity: 1;
}
img {
  max-width: 25vw;
}
h5 {
  text-align: center;
  margin: 2vh;
}
p {
  padding: 5vh 10vw;
}

@media screen and (orientation: portrait) {
  .item {
    width: 60vh;
    margin: 2vw;
    text-align: center;
  }
  .creds {
    display: flex;
    flex-wrap: unset;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
  img {
    max-width: 60vw;
  }
}
</style>
