import { Cache, CacheOptions } from './index.d'
import next from './next'

type InternalCache = { [key: string]: any }

function createCache(options?: CacheOptions): Cache {
  let undefinedValue: any = null
  if (options) {
    if (options.hasOwnProperty('undefinedValue')) {
      undefinedValue = options.undefinedValue
    }
  }

  const internalCache: InternalCache = {}

  const get: Cache['get'] = function(key, cb) {
    let value = undefinedValue
    if (internalCache.hasOwnProperty(key)) {
      value = internalCache[key]
    }
    next(cb, null, value)
  }

  const set: Cache['set'] = function(key, value, cb) {
    internalCache[key] = value
    next(cb, null)
  }

  const has: Cache['has'] = function(key, cb) {
    const exists = internalCache.hasOwnProperty(key)
    next(cb, null, exists)
  }

  const remove: Cache['remove'] = function(key, cb) {
    delete internalCache[key]
    next(cb, null)
  }

  const getp: Cache['promise']['get'] = function(key) {
    return new Promise((resolve, reject) =>
      get(key, (err, value) => err ? reject(err) : resolve(value)))
  }

  const setp: Cache['promise']['set'] = function(key, value) {
    return new Promise((resolve, reject) =>
      set(key, value, (err) => err ? reject(err) : resolve()))
  }

  const hasp: Cache['promise']['has'] = function(key) {
    return new Promise((resolve, reject) =>
      has(key, (err, exists) => err ? reject(err) : resolve(exists)))
  }

  const removep: Cache['promise']['remove'] = function(key) {
    return new Promise((resolve, reject) =>
      remove(key, (err) => err ? reject(err) : resolve()))
  }

  return {
    get,
    set,
    has,
    remove,
    promise: {
      get: getp,
      set: setp,
      has: hasp,
      remove: removep,
    }
  }
}

export default createCache
