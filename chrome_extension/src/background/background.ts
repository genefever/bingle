import { setStoredOverlayOption } from '../utils/storage'
import { MessageType, Messages } from '../utils/types'

// Called when extension is first installed.
chrome.runtime.onInstalled.addListener(() => {
  setStoredOverlayOption('enable')

  // Show Bingle chrome extension by default in the right-click dropdown.
  chrome.contextMenus.create({
    title: 'Search on Bingle',
    id: 'contextMenu1',
    contexts: ['selection'],
  })
})

// Listens to "Enable/Disable" settings changes from popup.tsx.
chrome.runtime.onMessage.addListener((message: MessageType) => {
  if (message.type === Messages.TOGGLE_ENABLE_EXTENSION) {
    if (message.enable === true) {
      // Show Bingle chrome extension in the right-click dropdown.
      chrome.contextMenus.create({
        title: 'Search on Bingle',
        id: 'contextMenu1',
        contexts: ['selection'],
      })
    } else {
      // Remove Bingle chrome extension in the right-click dropdown.
      chrome.contextMenus.remove('contextMenu1')
    }
  }
})

// Send the highlighted query text to contentScript.tsx.
chrome.contextMenus.onClicked.addListener((e) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: Messages.SET_QUERY,
      query: e.selectionText,
    })
  })
})
