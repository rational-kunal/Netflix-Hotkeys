import { HotkeysEvent } from './HotkeysEvent'

class EventManager {
  /**
   * Publish the passed event.
   * @param {HotkeysEvent} event
   */
  publish(event) {
    this.#dispatchEvent(event)
  }

  /** @type {Function[]} */
  #listeners = []

  /**
   * Add an event listener.
   * @param {Function} callback
   */
  addEventListener(callback) {
    this.#listeners.push(callback)
  }

  /**
   * Remove an event listener.
   * @param {Function} callback
   */
  removeEventListener(callback) {
    this.#listeners = this.#listeners.filter((listener) => listener !== callback)
  }

  /**
   * Dispatch an event.
   * @param {HotkeysEvent} event
   */
  #dispatchEvent(event) {
    this.#listeners.forEach((listener) => listener(event))
  }

  /**
   * Resets the Manager.
   *
   * NOTE: Used for testing purposes.
   */
  reset() {
    this.#listeners = []
  }
}

export default new EventManager()
