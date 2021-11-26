import { setStoredOverlayOption } from '../utils/storage'

// Called when extension is first installed.
chrome.runtime.onInstalled.addListener(() => {
  setStoredOverlayOption('toggle')

  // Show Bingle chrome extension in the right-click dropdown.
  chrome.contextMenus.create({
    title: 'Search on Bingle',
    id: 'contextMenu1',
    contexts: ['selection'],
  })
})

// Add click event
chrome.contextMenus.onClicked.addListener((e) => {
  // Send the highlighted query text to contentScript.tsx.
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: 'SET_QUERY',
      query: e.selectionText,
    })
  })
})
