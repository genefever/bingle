/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setStoredOverlayOption": () => (/* binding */ setStoredOverlayOption),
/* harmony export */   "getStoredOverlayOption": () => (/* binding */ getStoredOverlayOption)
/* harmony export */ });
// Setter function to set LocalStorageOptions.
function setStoredOverlayOption(overlayOption) {
    const val = {
        overlayOption,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(val, () => {
            resolve();
        });
    });
}
// Getter function to retrieve LocalStorageOptions.
function getStoredOverlayOption() {
    const keys = ['overlayOption'];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res) => {
            resolve(res);
        });
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage */ "./src/utils/storage.ts");

// Called when extension is first installed.
chrome.runtime.onInstalled.addListener(() => {
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setStoredOverlayOption)('enable');
    // Show Bingle chrome extension by default in the right-click dropdown.
    chrome.contextMenus.create({
        title: 'Search on Bingle',
        id: 'contextMenu1',
        contexts: ['selection'],
    });
});
// Listens to "Enable/Disable" settings changes from popup.tsx.
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'SET_ENABLE') {
        if (message.enable === true) {
            // Show Bingle chrome extension in the right-click dropdown.
            chrome.contextMenus.create({
                title: 'Search on Bingle',
                id: 'contextMenu1',
                contexts: ['selection'],
            });
        }
        else {
            // Remove Bingle chrome extension in the right-click dropdown.
            chrome.contextMenus.remove('contextMenu1');
        }
    }
});
// Send the highlighted query text to contentScript.tsx.
chrome.contextMenus.onClicked.addListener((e) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: 'SET_QUERY',
            query: e.selectionText,
        });
    });
});

})();

/******/ })()
;
//# sourceMappingURL=background.js.map