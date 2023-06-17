import Storage from './Storage'
import { jest } from '@jest/globals'
import { chrome } from '../../testing/ChromeMock'

// Demo storage class used for testing
class Demo extends Storage {
  x = this.field({ fallback: 0 })
  y = this.field({ fallback: 0 })
  noFallback = this.field()

  /**
   * For auto-complete and intellisense
   * @type {Demo}
   */
  static get instance() {
    return super.instance
  }
}

describe('Demo Storage', () => {
  afterEach(() => {
    Demo.reset()
    jest.resetAllMocks()
  })

  it('instance should be initialized', () => {
    expect(Demo.instance).toBeInstanceOf(Demo)
    expect(Demo.instance).toBe(Demo.instance)
  })

  it('should have correct initial values', () => {
    expect(Demo.instance.x).toBe(0)
    expect(Demo.instance.y).toBe(0)
  })

  it('should be able to set and get values', () => {
    Demo.instance.x = 4
    Demo.instance.y = 5

    expect(Demo.instance.x).toBe(4)
    expect(Demo.instance.y).toBe(5)
  })

  it('should be able to set values to the chrome storage', () => {
    Demo.instance.x = 4
    Demo.instance.y = 5

    expect(chrome.storage.local.set).toHaveBeenCalledWith({ x: 4 })
    expect(chrome.storage.local.set).toHaveBeenCalledWith({ y: 5 })
  })

  it('should be able to get values from the chrome storage', () => {
    chrome.storage.local.get.mockImplementationOnce((keys, callback) => {
      callback({ x: 4, y: 5 })
    })

    Demo.instance // Access once to build the storage
    expect(chrome.storage.local.get).toHaveBeenCalledWith(['x', 'y', 'noFallback'], expect.any(Function))
    expect(Demo.instance.x).toBe(4)
    expect(Demo.instance.y).toBe(5)
  })

  it('should be able to listen for changes to values', () => {
    chrome.storage.onChanged.addListener.mockImplementationOnce((callback) => {
      callback({ x: { newValue: 4 } })
    })

    Demo.instance // Access once to build the storage
    expect(chrome.storage.onChanged.addListener).toHaveBeenCalledWith(expect.any(Function))
    expect(Demo.instance.x).toBe(4)
    expect(Demo.instance.y).toBe(0)
  })

  it('should not set values if they are the same', () => {
    Demo.instance.x = 4
    Demo.instance.y = 5
    Demo.instance.x = 4
    Demo.instance.y = 5

    expect(chrome.storage.local.set).toHaveBeenCalledTimes(2)
  })

  it('should notify listeners when values are changed directly', () => {
    const listener = jest.fn()
    Demo.instance.on('x', listener)

    Demo.instance.x = 4
    Demo.instance.x = 1

    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('should notify listeners when values are changed from chrome storage', () => {
    let chromeListener = null
    chrome.storage.onChanged.addListener.mockImplementationOnce((callback) => {
      chromeListener = callback
    })

    const fieldListener = jest.fn()
    Demo.instance.on('x', fieldListener)

    // Change the value on chrome storage
    chromeListener({ x: { newValue: 4 } })

    expect(fieldListener).toHaveBeenCalledTimes(1)
  })

  it('should not notify listeners when values are changed to the same value', () => {
    const listener = jest.fn()
    Demo.instance.on('x', listener)

    Demo.instance.x = 4
    Demo.instance.x = 4

    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should not notify listeners after they are removed', () => {
    const listener = jest.fn()
    Demo.instance.on('x', listener)
    Demo.instance.x = 4
    expect(listener).toHaveBeenCalledTimes(1)

    Demo.instance.off('x', listener)
    Demo.instance.x = 5
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('returns correct values for all', () => {
    Demo.instance.x = 4
    Demo.instance.y = 5

    expect(Demo.instance.values).toEqual({ x: 4, y: 5, noFallback: null })
  })
})
