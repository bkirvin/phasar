import { useEmber } from './ember'
import { useRocket } from './rocket'

export function useEmitters () {
  const emitters = {
    ember: useEmber(),
    rocket: useRocket()
  }

  function mitter (emitter, action, scene) {
    switch (action) {
      case 'create':
        return emitters[emitter].emit(scene)
      case 'resize':
        emitters[emitter].resize()
        break
      default:
        return emitters[emitter].control()
    }
  }

  return {
    mitter
  }
}
