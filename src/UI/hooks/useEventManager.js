import { eventManager } from '../../core/EventManager'
import { useEffect, useState } from 'react'
import { HotkeysEvent } from '../../core/EventManager/HotkeysEvent'

/**
 * Layer between the eventManager and the UI.
 * @returns {HotkeysEvent|null} The active event.
 */
function useEventManager() {
  const [activeEvent, setActiveEvent] = useState(null)

  useEffect(() => {
    const callback = (event) => {
      setActiveEvent(event)
    }

    eventManager.addEventListener(callback)

    return () => {
      eventManager.removeEventListener(callback)
    }
  }, [])

  return activeEvent
}

export default useEventManager
