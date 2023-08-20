const HotkeysEventType = Object.freeze({
  PLAY_SPEED_FASTEST: 'PLAY_SPEED_FASTEST',
  PLAY_SPEED_NORMAL: 'PLAY_SPEED_NORMAL',
  PLAY_SPEED_SLOWEST: 'PLAY_SPEED_SLOWEST',
  SUBTITLE_ON: 'SUBTITLE_ON',
  SUBTITLE_OFF: 'SUBTITLE_OFF',
})

class HotkeysEvent {
  /**
   * Type of the event.
   * @type {HotkeysEventType|null}
   */
  type = null

  /**
   * Whether the event should be cleared after a delay.
   * Defaults to `true`.
   * @type {Boolean}
   */
  shouldClearAfterDelay = true

  /**
   * Creates a new Hotkeys Event.
   * @param {HotkeysEventType} type
   * @param {Boolean} shouldClearAfterDelay
   */
  constructor(type, shouldClearAfterDelay = true) {
    this.type = type
    this.shouldClearAfterDelay = shouldClearAfterDelay
  }
}

export { HotkeysEvent, HotkeysEventType }
