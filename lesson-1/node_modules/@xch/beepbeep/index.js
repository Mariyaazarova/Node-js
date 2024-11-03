/**
 * Create an async function that is resolved with the given delay.
 * @param  {number} delay
 * @return {Function}
 */
const createDelay = (delay) => () => new Promise((resolve) => setTimeout(resolve, delay))

/**
 * Returns a beep function with its own beeping queue.
 * @return {Function}
 */
const createBeeper = () => {
  const instance = {
    queue: Promise.resolve()
  }

  return beep.bind(instance)
}

const addBeep = (instance) => {
  instance.queue = instance.queue.then(beepNow)
}

const addDelayedBeep = (instance, delay) => {
  const delayFunc = createDelay(delay)

  instance.queue = instance.queue.then(delayFunc)
  addBeep(instance)
}

const addPromiseResolve = (instance, resolve) => {
  instance.queue = instance.queue.then(resolve)
}

/**
 * Make multiple console beep sounds
 * @param {number} [i=1] - Number of beeps
 * @param {number} [t=500] - Milliseconds between beeps
 * @return {Promise}
 */
function beep (i, t) {
  const instance = this

  return new Promise((resolve) => {
    if (Array.isArray(i)) {
      i.forEach(addDelayedBeep.bind(null, instance))
      addPromiseResolve(instance, resolve)

      return
    }

    i = isNaN(i) ? 1 : i
    t = isNaN(t) ? 500 : t

    while (i-- > 0) {
      if (t === 0) {
        addBeep(instance)
      } else {
        addDelayedBeep(instance, t)
      }
    }

    addPromiseResolve(instance, resolve)
  })
}

async function beepNow () {
  await process.stdout.write('\x07')
}

const defaultBeeper = createBeeper()

defaultBeeper.createBeeper = createBeeper

module.exports = defaultBeeper
