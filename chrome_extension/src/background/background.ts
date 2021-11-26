import { setStoredOverlayOption } from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  setStoredOverlayOption('toggle')

  chrome.contextMenus.create({
    title: 'Search on Bingle',
    id: 'contextMenu1',
    contexts: ['selection'],
  })
})

// Add click event
chrome.contextMenus.onClicked.addListener((e) => {
  // Send message to Popup.tsx to set the candidates.
  // Send highlighted query to contentScript.tsx.
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: 'SET_POPUP',
      query: e.selectionText,
      isActive: true,
    })
  })
})
