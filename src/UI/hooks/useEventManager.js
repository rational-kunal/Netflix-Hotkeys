import { eventManager } from '../../core/EventManager'
import { useEffect, useState } from 'react'
import { HotkeysEvent } from '../../core/EventManager/HotkeysEvent'

/**
 * Layer between the eventManager and the UI.
 * Listens to events and calls the listener.
 * @param {function(HotkeysEvent): void} listener The listener.
 * @returns {HotkeysEvent|null} The event.
 */
function useEventManager(listener) {
  useEffect(() => {
    const eventManagerCallback = (event) => {
      listener(event)
    }

    eventManager.addEventListener(eventManagerCallback)

    return () => {
      eventManager.removeEventListener(eventManagerCallback)
    }
  }, [])
}

export default useEventManager
