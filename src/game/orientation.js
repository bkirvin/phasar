/* eslint-disable */
import { Scale } from 'phaser'
import { Platform } from 'quasar'
import { EventBus } from 'src/game/EventBus'

let gameOrientation, itr
let paused = false
const pixelRatio = window.devicePixelRatio < 1 ? window.devicePixelRatio : 1
const android = Platform.is.android

const dim = {
  landscape: () => {
    if (android) {
      return {
        width: Math.max(window.screen.width, window.screen.height),
        height: Math.min(window.screen.width, window.screen.height) - (70 * pixelRatio)
      }
    } else {
      return {
        width: Math.max(window.screen.width, window.screen.height),
        height: Math.min(window.screen.width, window.screen.height)
      }
    }
  },
  portrait: () => {
    if (android) {
      return {
        width: Math.min(window.screen.width, window.screen.height),
        height: Math.max(window.screen.width, window.screen.height) - (70 * pixelRatio)
      }
    } else {
      return {
        width: Math.min(window.screen.width, window.screen.height),
        height: Math.max(window.screen.width, window.screen.height)
      }
    }
  },
  any: () => {
    if (android) {
      return {
        width: window.screen.width,
        height: window.screen.height - (70 * pixelRatio),
        scale: deviceScale()
      }
    } else {
      return {
        width: window.screen.width,
        height: window.screen.height,
        scale: Scale.RESIZE
      }
    }
  }
}

const orient = {
  landscape: {
    name: 'landscape',
    width: dim.landscape().width * pixelRatio,
    height: dim.landscape().height * pixelRatio,
    scale: Scale.WIDTH_CONTROLS_HEIGHT
  },
  portrait: {
    name: 'portrait',
    width: dim.portrait().width * pixelRatio,
    height: dim.portrait().height * pixelRatio,
    scale: Scale.HEIGHT_CONTROLS_WIDTH
  },
  any: {
    name: 'any',
    width: '100%',
    height: '100%',
    scale: dim.any().scale
  }
}

function deviceScale () {
  return isLandscape() ? Scale.WIDTH_CONTROLS_HEIGHT : Scale.HEIGHT_CONTROLS_WIDTH
}

function isAndroid () {
  return android
}

const setOrientation = function (orientation) {
  gameOrientation = orient[orientation]
}

const getName = function () {
  if (gameOrientation) {
    return gameOrientation.name
  }
  return null
}

const getPixelRatio = function () {
  return pixelRatio
}

const getScale = function () {
  if (gameOrientation) {
    return gameOrientation.scale
  }
  return null
}

const getWidth = function () {
  if (gameOrientation) {
    return dim[gameOrientation.name]().width
  }
  return null
}

const getHeight = function () {
  if (gameOrientation) {
    return dim[gameOrientation.name]().height
  }
  return null
}

const getPaused = function () {
  return paused
}

function isLandscape () {
  return window.screen.height < window.screen.width
}

function isPortrait () {
  return window.screen.height > window.screen.width
}

const orientationMatch = function () {
  if (gameOrientation) {
    if (gameOrientation.name === 'landscape') return isLandscape()
    if (gameOrientation.name === 'portrait') return isPortrait()
  }

  return true
}

const constrainScreen = () => {
  const matches = orientationMatch()
  if (!matches) {
    if (!paused) {
      paused = true
      let data = {
        detail: {
          show: matches
        }
      }
      EventBus.emit('orient', data)
      data = {
        detail: {
          showOrientation: true
        }
      }
      EventBus.emit('showOrientation', data)
      itr = setInterval(() => {
        return constrainScreen()
      }, 500)
    }
  } else {
    if (paused) {
      clearInterval(itr)
      paused = false
      const matches = orientationMatch()
      let data = {
        detail: {
          show: matches
        }
      }
      EventBus.emit('orient', data)
      data = {
        detail: {
          showOrientation: false
        }
      }
      EventBus.emit('showOrientation', data)
    }
  }
}

export default {
  setOrientation,
  getName,
  getScale,
  getWidth,
  getHeight,
  getPaused,
  orientationMatch,
  constrainScreen,
  getPixelRatio,
  isAndroid
}
