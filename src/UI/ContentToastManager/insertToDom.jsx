import { createRoot } from 'react-dom/client'
import ContentToastManager from './ContentToastManager'

/**
 * Inserts the `ContentToastManager` to the DOM.
 *
 * Creates a new root node and appends it to the body and renders the `ContentToastManager` to it.
 */
export default function insertContentToastManagerToDOM() {
  const rootDiv = document.createElement('div')
  document.body.appendChild(rootDiv)
  const root = createRoot(rootDiv)

  // Render the `ContentToastManager` to the root.
  root.render(<ContentToastManager />)
}
