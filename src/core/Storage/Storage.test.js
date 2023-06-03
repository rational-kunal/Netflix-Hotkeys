import Storage from './Storage'
import { jest } from '@jest/globals'
import { chrome } from '../../testing/ChromeMock'

// Demo storage class used for testing
class Demo extends Storage {
  constructor() {
    super()
  }

  x = this.field(0)
  y = this.field(0)
}

describe('Demo Storage', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should be able to build', () => {
    const demo = new Demo()
    demo.build()

    expect(demo.x).toBe(0)
    expect(demo.y).toBe(0)
  })

  it('should be able to set and get values', () => {
    const demo = new Demo()
    demo.build()

    demo.x = 4
    demo.y = 5

    expect(demo.x).toBe(4)
    expect(demo.y).toBe(5)
  })

  it('should be able to set values to the chrome storage', () => {
    const demo = new Demo()
    demo.build()

    demo.x = 4
    demo.y = 5

    expect(chrome.storage.local.set).toHaveBeenCalledWith({ x: 4 })
    expect(chrome.storage.local.set).toHaveBeenCalledWith({ y: 5 })
  })

  it('should be able to get values from the chrome storage', () => {
    chrome.storage.local.get.mockImplementationOnce((keys, callback) => {
      callback({ x: 4, y: 5 })
    })

    const demo = new Demo()
    demo.build()

    expect(chrome.storage.local.get).toHaveBeenCalledWith(['x', 'y'], expect.any(Function))
    expect(demo.x).toBe(4)
    expect(demo.y).toBe(5)
  })

  it('should be able to listen for changes to values', () => {
    chrome.storage.onChanged.addListener.mockImplementationOnce((callback) => {
      callback({ x: { newValue: 4 } })
    })

    const demo = new Demo()
    demo.build()

    expect(chrome.storage.onChanged.addListener).toHaveBeenCalledWith(expect.any(Function))
    expect(demo.x).toBe(4)
    expect(demo.y).toBe(0)
  })

  it('should not set values if they are the same', () => {
    const demo = new Demo()
    demo.build()

    demo.x = 4
    demo.y = 5
    demo.x = 4
    demo.y = 5

    expect(chrome.storage.local.set).toHaveBeenCalledTimes(2)
  })

  it('should notify listeners when values are changed directly', () => {
    const demo = new Demo()
    demo.build()

    const listener = jest.fn()
    demo.on('x', listener)

    demo.x = 4
    demo.x = 1

    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('should notify listeners when values are changed from chrome storage', () => {
    chrome.storage.onChanged.addListener.mockImplementationOnce((callback) => {
      callback({ x: { newValue: 4 } })
    })

    const demo = new Demo()
    const listener = jest.fn()
    demo.on('x', listener)
    demo.build()

    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should not notify listeners when values are changed to the same value', () => {
    const demo = new Demo()
    demo.build()

    const listener = jest.fn()
    demo.on('x', listener)

    demo.x = 4
    demo.x = 4

    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should not notify listeners after they are removed', () => {
    const demo = new Demo()
    demo.build()

    const listener = jest.fn()
    demo.on('x', listener)
    demo.x = 4
    expect(listener).toHaveBeenCalledTimes(1)

    demo.off('x', listener)
    demo.x = 5
    expect(listener).toHaveBeenCalledTimes(1)
  })
})
