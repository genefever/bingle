import { setStoredOverlayOption } from '../utils/storage'
import { fetchApiData } from '../utils/api'
import { MessageType } from '../utils/types'

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
  // Send highlighted query to the backend.
  const res = fetchApiData(e.selectionText)

  // Send message to contentScript.tsx to activate the popup.
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: 'TOGGLE_IS_ACTIVE',
      isActive: true,
    })
  })
})
