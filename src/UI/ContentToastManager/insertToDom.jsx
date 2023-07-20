import ContentToastManager from './ContentToastManager'

/**
 *  Inserts the `ContentToastManager` to the passed root.
 *  @param { import('react-dom/client').Root } root
 */
export default function insertContentToastManagerToRoot(root) {
  console.info('[🍞] Content Toast Manager added to the DOM')
  root.render(<ContentToastManager />)
}
