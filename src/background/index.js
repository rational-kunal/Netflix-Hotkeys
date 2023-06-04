console.info('[Netflix Hotkeys] background script')

// Open options page when clicked on the extension icon
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'src/options.html' })
})

// Open options page when installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: 'src/options.html' })
})

// Listen to changes in chrome storage (for debugging)
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log('[📁] Storage updated:', key, oldValue, '→', newValue)
  }
})

export {}
