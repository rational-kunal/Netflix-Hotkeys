import { HotkeysEvent } from './HotkeysEvent'

class EventManager {
  /** @type {HotkeysEvent|null} */
  #activeEvent = null

  /**
   * The active event.
   * @type {HotkeysEvent|null}
   */
  get activeEvent() {
    return this.#activeEvent
  }
  set activeEvent(event) {
    this.#activeEvent = event
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
    this.#activeEvent = null
    this.#listeners = []
  }
}

export default new EventManager()
