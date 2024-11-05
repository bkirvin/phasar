export function useEmber () {
  let emitr
  function emit (scene) {
    emitr = scene.add.particles(null, null, 'ember', {
      name: 'ember',
      speed: 50,
      frequency: 20,
      quantity: 10,
      lifespan: 500,
      gravity: { x: 0, y: -200 },
      scale: { start: 0.01, end: 0.5 },
      alpha: { start: 1, end: 0 },
      follow: scene.balls.getFirstAlive(),
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
    // nothing
  }

  return {
    emit,
    control,
    resize
  }
}
