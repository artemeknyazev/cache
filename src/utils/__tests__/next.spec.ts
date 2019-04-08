import next from '../next'

function tryTest(done: () => void) {
  const mockFn1 = jest.fn()
  const mockFn2 = jest.fn()

  mockFn1()
  next(mockFn2)

  setTimeout(() => {
    expect(mockFn1).toHaveBeenCalledTimes(1)
    expect(mockFn2).toHaveBeenCalledTimes(1)
    done()
  }, 0)

  expect(mockFn1).toHaveBeenCalledTimes(1)
  expect(mockFn2).toHaveBeenCalledTimes(0)
}

describe('`next` call schedules a function to run in the next event loop phase', () => {
  it('during a normal script execution', (done) => {
    tryTest(done)
  })

  if (process && (typeof process.nextTick === 'function')) {
    it('during process.nextTick call', (done) => {
      process.nextTick(tryTest, done)
    })
  }

  if (typeof setImmediate === 'function') {
    it('during setImmediate call', (done) => {
      process.nextTick(tryTest, done)
    })
  }

  it('during setTimeout call', (done) => {
    setTimeout(tryTest, 0, done)
  })
})
