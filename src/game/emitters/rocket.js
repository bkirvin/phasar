export function useRocket () {
  let emitr
  function emit (scene) {
    emitr = scene.add.particles(scene.GameWidthCenter, scene.GameHeightCenter, 'ember', {
      name: 'rocket',
      tint: { min: 0xff0000, max: 0x0000ff },
      speed: { min: 100, max: 400 },
      frequency: -1,
      quantity: 150,
      lifespan: { min: 500, max: 2000 },
      gravityY: 300,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
      emitting: false
    })
    emitr.stop()
    return emitr
  }
  function control () {
    return emitr
  }
  function resize () {
    emitr.setPosition(emitr.scene.GameWidthCenter, emitr.scene.GameHeightCenter)
  }

  return {
    emit,
    control,
    resize
  }
}
