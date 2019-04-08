type AnyArgs = any[]
type AnyFunction = (...args: AnyArgs) => any
type NextFunction = (fn: AnyFunction, ...args: AnyArgs) => void

function createNext(): NextFunction {
  if (process && (typeof process.nextTick === 'function')) {
    return (fn, ...args) => {
      process.nextTick(fn, ...args)
    }
  } else if (typeof setImmediate === 'function') {
    return (fn, ...args) => {
      setImmediate(fn, ...args)
    }
  } else if (typeof setTimeout === 'function') {
    return (fn, ...args) => {
      setTimeout(fn, 0, ...args)
    }
  } else {
    throw new Error('Can not schedule execution: one of process.nextTick, setImmediate, setTimeout is required')
  }
}

/**
 * Call a function as soon as possible in the event loop
 */
export default createNext()
