import { setStoredOptions } from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  setStoredOptions({
    overlaySetting: 'toggle',
    isActive: false,
  })

  chrome.contextMenus.create({
    title: 'Search on Bingle',
    id: 'contextMenu1',
    contexts: ['selection'],
  })

  chrome.contextMenus.onClicked.addListener((e) => {
    // this is the selected text to be used as a query.
    console.log(e.selectionText)

    // Send text to backend using fetch or axios.
  })
})
