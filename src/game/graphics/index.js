export function useGraphics () {
  function buildBg (scene) {
    const { width, height } = scene.sys.game.canvas
    // top background gradient
    if (!scene.bg1) {
      scene.bg1 = scene.add.image(0, 0, 'square')
    }
    scene.bg1.setOrigin(0, 0)
      .setX(0)
      .setY(0)
      .setDisplaySize(width, height * 0.2)
      .setTint(0x05a1fb, 0x05a1fb, 0x013e62, 0x013e62)
      .setDepth(-1)

    // bottom background gradient
    if (!scene.bg2) {
      scene.bg2 = scene.add.image(0, height * 0.2, 'square')
    }
    scene.bg2.setOrigin(0, 0)
      .setX(0)
      .setY(height * 0.2)
      .setDisplaySize(width, height * 0.8)
      .setTint(0x013e62, 0x013e62, 0x00141f, 0x00141f)
      .setDepth(-1)
  }

  return {
    buildBg
  }
}
