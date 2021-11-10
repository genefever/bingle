/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
chrome.runtime.onInstalled.addListener((details) => {
    chrome.contextMenus.create({
        title: 'Search on Bingle',
        id: 'contextMenu1',
        contexts: ['selection'],
    });
    chrome.contextMenus.onClicked.addListener((e) => {
        // this is the selected text to be used as a query.
        console.log(e.selectionText);
        // Send text to backend using fetch or axios.
    });
});

/******/ })()
;
//# sourceMappingURL=background.js.map