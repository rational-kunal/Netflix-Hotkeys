console.info('[Netflix Hotkeys] background script')

// Open options page when clicked on the extension icon
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'src/options.html' })
})

export {}
