import createCache from '../.'

describe('`cache.has` call', () => {
  describe('for a not present key', () => {
    it('returns false', (done) => {
      const cache = createCache()
      cache.has('some key', (err, exists) => {
        expect(err).toBe(null)
        expect(exists).toBe(false)
        done()
      })
    })
  })

  describe('for a present key', () => {
    it('returns true', (done) => {
      const cache = createCache()
      const key = 'some key'
      const value = 'some value'
      cache.set(key, value, (errSet) => {
        cache.has(key, (errHas, exists) => {
          expect(errSet).toBe(null)
          expect(errHas).toBe(null)
          expect(exists).toBe(true)
          done()
        })
      })
    })
  })

  describe('for a removed key', () => {
    it('returns false', (done) => {
      const cache = createCache()
      cache.has('some key', (err, exists) => {
        expect(err).toBe(null)
        expect(exists).toBe(false)
        done()
      })
    })
  })
})

describe('`cache.get` call', () => {
  describe('for a not present key', () => {
    it('returns null by default', (done) => {
      const cache = createCache()
      cache.get('some key', (err, value) => {
        expect(err).toBe(null)
        expect(value).toBe(null)
        done()
      })
    })

    it('returns `options.undefinedValue` if set', (done) => {
      const undefinedValue = 'ABC'
      const cache = createCache({ undefinedValue })
      cache.get('some key', (err, value) => {
        expect(err).toBe(null)
        expect(value).toEqual(undefinedValue)
        done()
      })
    })
  })

  describe('for a present key', () => {
    it('returns a value previously set', (done) => {
      const cache = createCache()
      const key = 'some key'
      const value = 'some value'
      cache.set(key, value, (errSet) => {
        cache.get(key, (errGet, value) => {
          expect(errSet).toBe(null)
          expect(errGet).toBe(null)
          expect(value).toEqual(value)
          done()
        })
      })
    })
  })

  describe('for a removed key', () => {
    it('returns null by default', (done) => {
      const cache = createCache()
      const key = 'some key'
      const value = 'some value'
      cache.set(key, value, (errSet) => {
        cache.remove(key, (errRemove) => {
          cache.get(key, (errGet, value) => {
            expect(errSet).toBe(null)
            expect(errRemove).toBe(null)
            expect(errGet).toBe(null)
            expect(value).toBe(null)
            done()
          })
        })
      })
    })

    it('returns `options.undefinedValue` if set', (done) => {
      const undefinedValue = 'ABC'
      const cache = createCache({ undefinedValue })
      const key = 'some key'
      const value = 'some value'
      cache.set(key, value, (errSet) => {
        cache.remove(key, (errRemove) => {
          cache.get(key, (errGet, value) => {
            expect(errSet).toBe(null)
            expect(errRemove).toBe(null)
            expect(errGet).toBe(null)
            expect(value).toEqual(undefinedValue)
            done()
          })
        })
      })
    })
  })
})

describe('`cache.set` call', () => {
  describe('for a not present key', () => {
    it('sets a key value', (done) => {
      const cache = createCache()
      const key = 'some key'
      const value = 'some value'
      cache.set(key, value, (errSet) => {
        cache.get(key, (errGet, valueGet) => {
          expect(errSet).toBe(null)
          expect(errGet).toBe(null)
          expect(valueGet).toEqual(value)
          done()
        })
      })
    })
  })

  describe('for a present key', () => {
    it('overwrites a key value', (done) => {
      const cache = createCache()
      const key = 'some key'
      const valueOld = 'some value'
      const valueNew = 'some value new'
      cache.set(key, valueOld, (errSetOld) => {
        cache.set(key, valueNew, (errSetNew) => {
          cache.get(key, (errGet, valueGet) => {
            expect(errSetOld).toBe(null)
            expect(errSetNew).toBe(null)
            expect(errGet).toBe(null)
            expect(valueGet).toEqual(valueNew)
            done()
          })
        })
      })
    })
  })

  describe('for a removed key', () => {
    it('sets a key value', (done) => {
      const cache = createCache()
      const key = 'some key'
      const valueOld = 'some value'
      const valueNew = 'some value new'
      cache.set(key, valueOld, (errSetOld) => {
        cache.remove(key, (errRemove) => {
          cache.set(key, valueNew, (errSetNew) => {
            cache.get(key, (errGet, valueGet) => {
              expect(errSetOld).toBe(null)
              expect(errRemove).toBe(null)
              expect(errSetNew).toBe(null)
              expect(errGet).toBe(null)
              expect(valueGet).toEqual(valueNew)
              done()
            })
          })
        })
      })
    })
  })

  it('does not modify other keys', (done) => {
    const cache = createCache()
    const key1 = 'some key1'
    const key2 = 'some key2'
    const value1Old = 'some value1'
    const value1New = 'some value1 new'
    const value2 = 'some value2'
    cache.set(key1, value1Old, (errSetOld1) => {
      cache.set(key2, value2, (errSet2) => {
        cache.set(key1, value1New, (errSetNew1) => {
          cache.get(key2, (errGet2, valueGet2) => {
            expect(errSetOld1).toBe(null)
            expect(errSet2).toBe(null)
            expect(errSetNew1).toBe(null)
            expect(errGet2).toBe(null)
            expect(valueGet2).toEqual(value2)
            done()
          })
        })
      })
    })
  })
})

describe('`cache.remove` call', () => {
  describe('for a not present key', () => {
    it('removes nothing', (done) => {
      const cache = createCache()
      const key = 'some key'
      cache.remove(key, (err) => {
        expect(err).toBe(null)
        done()
      })
    })
  })

  describe('for a present key', () => {
    it('removes a value', (done) => {
      const cache = createCache()
      const key = 'some key'
      const value = 'some value'
      cache.set(key, value, (errSet) => {
        cache.remove(key, (errRemove) => {
          expect(errSet).toBe(null)
          expect(errRemove).toBe(null)
          done()
        })
      })
    })
  })

  describe('for a removed key', () => {
    it('removes nothing', (done) => {
      const cache = createCache()
      const key = 'some key'
      const value = 'some value'
      cache.set(key, value, (errSet) => {
        cache.remove(key, (errRemove1) => {
          cache.remove(key, (errRemove2) => {
            expect(errSet).toBe(null)
            expect(errRemove1).toBe(null)
            expect(errRemove2).toBe(null)
            done()
          })
        })
      })
    })
  })

  it('does not modify other keys', (done) => {
    const cache = createCache()
    const key1 = 'some key1'
    const key2 = 'some key2'
    const value1 = 'some value1'
    const value2 = 'some value2'
    cache.set(key1, value1, (errSet1) => {
      cache.set(key2, value2, (errSet2) => {
        cache.remove(key1, (errRemove1) => {
          cache.get(key2, (errGet2, valueGet2) => {
            expect(errSet1).toBe(null)
            expect(errSet2).toBe(null)
            expect(errRemove1).toBe(null)
            expect(errGet2).toBe(null)
            expect(valueGet2).toEqual(value2)
            done()
          })
        })
      })
    })
  })
})
