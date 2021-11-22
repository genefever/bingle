import { setStoredIsActive, setStoredOverlayOption } from '../utils/storage'
import { fetchApiData } from '../utils/api'

chrome.runtime.onInstalled.addListener(() => {
  setStoredIsActive(true)
  setStoredOverlayOption('toggle')

  chrome.contextMenus.create({
    title: 'Search on Bingle',
    id: 'contextMenu1',
    contexts: ['selection'],
  })
})

// Add click event
chrome.contextMenus.onClicked.addListener((e) => {
  // this is the selected text to be used as a query.
  console.log(e.selectionText)

  // Send text to backend using fetch or axios.
  const res = fetchApiData(e.selectionText)
  console.log(res)
})
