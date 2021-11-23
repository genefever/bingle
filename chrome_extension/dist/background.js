/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/api.ts":
/*!**************************!*\
  !*** ./src/utils/api.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchApiData": () => (/* binding */ fetchApiData),
/* harmony export */   "fetchWikiData": () => (/* binding */ fetchWikiData)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const OPEN_WEATHER_API_KEY = 'e5920fe1a6b8c2295e118ca469f38da6';
function fetchApiData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'http://localhost:4000/api?' +
            new URLSearchParams({
                query: query,
            });
        const res = yield fetch(url);
        if (!res.ok) {
            throw new Error('Wiki data could not be retrieved.');
        }
        const data = yield res.json();
        //   console.log(data)
        return data;
    });
}
function fetchWikiData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`);
        if (!res.ok) {
            throw new Error('Wiki data could not be retrieved.');
        }
        const data = yield res.json();
        //   console.log(data)
        return data;
    });
}


/***/ }),

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
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.ts");


chrome.runtime.onInstalled.addListener(() => {
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setStoredOverlayOption)('toggle');
    chrome.contextMenus.create({
        title: 'Search on Bingle',
        id: 'contextMenu1',
        contexts: ['selection'],
    });
});
// Add click event
chrome.contextMenus.onClicked.addListener((e) => {
    // Send highlighted query to the backend.
    const res = (0,_utils_api__WEBPACK_IMPORTED_MODULE_1__.fetchApiData)(e.selectionText);
    // Send message to contentScript.tsx to activate the popup.
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: 'TOGGLE_IS_ACTIVE',
            isActive: true,
        });
    });
});

})();

/******/ })()
;
//# sourceMappingURL=background.js.map