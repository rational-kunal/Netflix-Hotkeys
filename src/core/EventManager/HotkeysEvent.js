const HotkeysEventType = Object.freeze({
  PLAY_SPEED_FASTEST: 'PLAY_SPEED_FASTEST',
  PLAY_SPEED_NORMAL: 'PLAY_SPEED_NORMAL',
  PLAY_SPEED_SLOWEST: 'PLAY_SPEED_SLOWEST',
})

class HotkeysEvent {
  /**
   * Type of the event.
   * @type {HotkeysEventType|null}
   */
  type = null

  /**
   * Creates a new Hotkeys Event.
   * @param {HotkeysEventType} type
   */
  constructor(type) {
    this.type = type
  }
}

export { HotkeysEvent, HotkeysEventType }
