"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var suncalc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! suncalc */ \"./node_modules/suncalc/suncalc.js\");\n/* harmony import */ var suncalc__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(suncalc__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\n\nfunction Home() {\n    _s();\n    const [location, setLocation] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [angle, setAngle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [result, setResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const calculateMain = async ()=>{\n        try {\n            const api = \"7a6f67f4e6764821a793fb652a876eb4\";\n            const response = await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"https://api.opencagedata.com/geocode/v1/json?q=\".concat(location, \"&key=\").concat(api));\n            const data = response.data;\n            if (data.results.length > 0) {\n                const { lat, lng } = data.results[0].geometry;\n                calculateSunData(lat, lng);\n            } else {\n                setResult('Location not found. Please try again.');\n            }\n        } catch (error) {\n            console.error('Error fetching location:', error);\n            setResult('Error fetching location. Please try again.');\n        }\n    };\n    function calculateSunData(lat, lng) {\n        const times = suncalc__WEBPACK_IMPORTED_MODULE_2___default().getTimes(new Date(), lat, lng);\n        if (!times.sunrise || !times.sunset) {\n            setResult('The sun does not rise or set at this location on this date.');\n            return;\n        }\n        const userAngle = angle.trim().toLowerCase();\n        // Handle \"Max Height\" (Solar Noon)\n        if (userAngle === \"max height\") {\n            const maxHeightTime = new Date(times.solarNoon);\n            setResult(\"Max Height (Solar Noon) at: \".concat(maxHeightTime.toLocaleTimeString()));\n            return;\n        }\n        const parsedAngle = parseFloat(angle);\n        if (isNaN(parsedAngle) || parsedAngle < -90 || parsedAngle > 90) {\n            setResult('Please enter a valid angle between -90° and 90° or \"Max Height\".');\n            return;\n        }\n        // Handle -15° (Morning civil twilight)\n        if (parsedAngle === -15) {\n            const dawnTime = times.dawn ? times.dawn.toLocaleTimeString() : 'No dawn time available';\n            setResult(\"-15\\xb0 Morning Civil Twilight: \".concat(dawnTime));\n            return;\n        }\n        // Handle 0° (Sunrise)\n        if (parsedAngle === 0) {\n            setResult(\"Sunrise: \".concat(times.sunrise.toLocaleTimeString()));\n            return;\n        }\n        // Handle 45° (Specific angle case)\n        if (parsedAngle === 45) {\n            let targetTime = null;\n            const date = new Date();\n            for(let i = 0; i <= 1440; i += 5){\n                const time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, i);\n                const position = suncalc__WEBPACK_IMPORTED_MODULE_2___default().getPosition(time, lat, lng);\n                const altitude = position.altitude * 180 / Math.PI;\n                if (Math.abs(altitude - 45) < 0.5) {\n                    targetTime = time;\n                    break;\n                }\n            }\n            if (targetTime) {\n                setResult(\"Time when sun is at 45\\xb0: \".concat(targetTime.toLocaleTimeString()));\n            } else {\n                setResult('The sun does not reach 45° at this location on this date.');\n            }\n            return;\n        }\n        // Handle tan⁻¹(2) which corresponds to ~63.43°\n        if (Math.abs(parsedAngle - Math.atan(2) * (180 / Math.PI)) < 0.5) {\n            let targetTime = null;\n            const date = new Date();\n            for(let i = 0; i <= 1440; i += 5){\n                const time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, i);\n                const position = suncalc__WEBPACK_IMPORTED_MODULE_2___default().getPosition(time, lat, lng);\n                const altitude = position.altitude * 180 / Math.PI;\n                if (Math.abs(altitude - 63.43) < 0.5) {\n                    targetTime = time;\n                    break;\n                }\n            }\n            if (targetTime) {\n                setResult(\"Time when sun is at tan⁻\\xb9(2) (63.43\\xb0): \".concat(targetTime.toLocaleTimeString()));\n            } else {\n                setResult('The sun does not reach 63.43° at this location on this date.');\n            }\n            return;\n        }\n        // Handle 0° (Sunset)\n        if (parsedAngle === 0) {\n            setResult(\"Sunset: \".concat(times.sunset.toLocaleTimeString()));\n            return;\n        }\n        // Handle -15° (Evening civil twilight)\n        if (parsedAngle === -15) {\n            const duskTime = times.dusk ? times.dusk.toLocaleTimeString() : 'No dusk time available';\n            setResult(\"-15\\xb0 Evening Civil Twilight: \".concat(duskTime));\n            return;\n        }\n        // Handle other angles\n        let targetTime = null;\n        const date = new Date();\n        for(let i = 0; i <= 1440; i += 5){\n            const time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, i);\n            const position = suncalc__WEBPACK_IMPORTED_MODULE_2___default().getPosition(time, lat, lng);\n            const altitude = position.altitude * 180 / Math.PI;\n            if (Math.abs(altitude - parsedAngle) < 0.5) {\n                targetTime = time;\n                break;\n            }\n        }\n        if (!targetTime) {\n            setResult(\"The sun does not reach an altitude of \".concat(parsedAngle, \"\\xb0 at this location on this date.\"));\n            return;\n        }\n        const sunrise = times.sunrise.toLocaleTimeString();\n        const sunset = times.sunset.toLocaleTimeString();\n        const altitudeNow = suncalc__WEBPACK_IMPORTED_MODULE_2___default().getPosition(new Date(), lat, lng).altitude * 180 / Math.PI;\n        setResult(\"\\n      Sunrise: \".concat(sunrise, \",\\n      Sunset: \").concat(sunset, \",\\n      Current Altitude: \").concat(altitudeNow.toFixed(2), \"\\xb0,\\n      Time at \").concat(parsedAngle, \"\\xb0: \").concat(targetTime.toLocaleTimeString(), \"\\n    \"));\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex flex-col p-11 m-11\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                onChange: (e)=>setLocation(e.target.value),\n                placeholder: \"Enter city\",\n                className: \"bg-transparent w-96 p-2 border border-gray-400 mb-4\"\n            }, void 0, false, {\n                fileName: \"/workspaces/sunInfo/pages/index.js\",\n                lineNumber: 153,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                onChange: (e)=>setAngle(e.target.value),\n                placeholder: \"Enter angle (-90\\xb0 to 90\\xb0) or 'Max Height'\",\n                className: \"bg-transparent w-96 p-2 border border-gray-400 mb-4\"\n            }, void 0, false, {\n                fileName: \"/workspaces/sunInfo/pages/index.js\",\n                lineNumber: 158,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: calculateMain,\n                className: \"p-2 w-14 bg-blue-500 text-white rounded-md hover:bg-blue-600\",\n                children: \"Go\"\n            }, void 0, false, {\n                fileName: \"/workspaces/sunInfo/pages/index.js\",\n                lineNumber: 163,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mt-4 text-lg\",\n                children: result\n            }, void 0, false, {\n                fileName: \"/workspaces/sunInfo/pages/index.js\",\n                lineNumber: 169,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/workspaces/sunInfo/pages/index.js\",\n        lineNumber: 152,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"3PdqHIYFuLHRg0yBgY5AGgBR2n4=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBZ0JsRDs7Ozs7Ozs7Ozs7O0FBR3JDO0dBdkt3Qkw7S0FBQUEiLCJzb3VyY2VzIjpbIi93b3Jrc3BhY2VzL3N1bkluZm8vcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdW5DYWxjIGZyb20gXCJzdW5jYWxjXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IFtsb2NhdGlvbiwgc2V0TG9jYXRpb25dID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbYW5nbGUsIHNldEFuZ2xlXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Jlc3VsdCwgc2V0UmVzdWx0XSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIGNvbnN0IGNhbGN1bGF0ZU1haW4gPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFwaSA9IFwiN2E2ZjY3ZjRlNjc2NDgyMWE3OTNmYjY1MmE4NzZlYjRcIjsgXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChgaHR0cHM6Ly9hcGkub3BlbmNhZ2VkYXRhLmNvbS9nZW9jb2RlL3YxL2pzb24/cT0ke2xvY2F0aW9ufSZrZXk9JHthcGl9YCk7XG4gICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgaWYgKGRhdGEucmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHsgbGF0LCBsbmcgfSA9IGRhdGEucmVzdWx0c1swXS5nZW9tZXRyeTtcbiAgICAgICAgY2FsY3VsYXRlU3VuRGF0YShsYXQsIGxuZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRSZXN1bHQoJ0xvY2F0aW9uIG5vdCBmb3VuZC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgbG9jYXRpb246JywgZXJyb3IpO1xuICAgICAgc2V0UmVzdWx0KCdFcnJvciBmZXRjaGluZyBsb2NhdGlvbi4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gY2FsY3VsYXRlU3VuRGF0YShsYXQsIGxuZykge1xuICAgIGNvbnN0IHRpbWVzID0gU3VuQ2FsYy5nZXRUaW1lcyhuZXcgRGF0ZSgpLCBsYXQsIGxuZyk7IFxuICAgIGlmICghdGltZXMuc3VucmlzZSB8fCAhdGltZXMuc3Vuc2V0KSB7XG4gICAgICBzZXRSZXN1bHQoJ1RoZSBzdW4gZG9lcyBub3QgcmlzZSBvciBzZXQgYXQgdGhpcyBsb2NhdGlvbiBvbiB0aGlzIGRhdGUuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXNlckFuZ2xlID0gYW5nbGUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgXG4gICAgLy8gSGFuZGxlIFwiTWF4IEhlaWdodFwiIChTb2xhciBOb29uKVxuICAgIGlmICh1c2VyQW5nbGUgPT09IFwibWF4IGhlaWdodFwiKSB7XG4gICAgICBjb25zdCBtYXhIZWlnaHRUaW1lID0gbmV3IERhdGUodGltZXMuc29sYXJOb29uKTtcbiAgICAgIHNldFJlc3VsdChgTWF4IEhlaWdodCAoU29sYXIgTm9vbikgYXQ6ICR7bWF4SGVpZ2h0VGltZS50b0xvY2FsZVRpbWVTdHJpbmcoKX1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJzZWRBbmdsZSA9IHBhcnNlRmxvYXQoYW5nbGUpO1xuICAgIGlmIChpc05hTihwYXJzZWRBbmdsZSkgfHwgcGFyc2VkQW5nbGUgPCAtOTAgfHwgcGFyc2VkQW5nbGUgPiA5MCkge1xuICAgICAgc2V0UmVzdWx0KCdQbGVhc2UgZW50ZXIgYSB2YWxpZCBhbmdsZSBiZXR3ZWVuIC05MMKwIGFuZCA5MMKwIG9yIFwiTWF4IEhlaWdodFwiLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSAtMTXCsCAoTW9ybmluZyBjaXZpbCB0d2lsaWdodClcbiAgICBpZiAocGFyc2VkQW5nbGUgPT09IC0xNSkge1xuICAgICAgY29uc3QgZGF3blRpbWUgPSB0aW1lcy5kYXduID8gdGltZXMuZGF3bi50b0xvY2FsZVRpbWVTdHJpbmcoKSA6ICdObyBkYXduIHRpbWUgYXZhaWxhYmxlJztcbiAgICAgIHNldFJlc3VsdChgLTE1wrAgTW9ybmluZyBDaXZpbCBUd2lsaWdodDogJHtkYXduVGltZX1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgMMKwIChTdW5yaXNlKVxuICAgIGlmIChwYXJzZWRBbmdsZSA9PT0gMCkge1xuICAgICAgc2V0UmVzdWx0KGBTdW5yaXNlOiAke3RpbWVzLnN1bnJpc2UudG9Mb2NhbGVUaW1lU3RyaW5nKCl9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIDQ1wrAgKFNwZWNpZmljIGFuZ2xlIGNhc2UpXG4gICAgaWYgKHBhcnNlZEFuZ2xlID09PSA0NSkge1xuICAgICAgbGV0IHRhcmdldFRpbWUgPSBudWxsO1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxNDQwOyBpICs9IDUpIHsgIFxuICAgICAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpLCAwLCBpKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBTdW5DYWxjLmdldFBvc2l0aW9uKHRpbWUsIGxhdCwgbG5nKTtcbiAgICAgICAgY29uc3QgYWx0aXR1ZGUgPSAocG9zaXRpb24uYWx0aXR1ZGUgKiAxODApIC8gTWF0aC5QSTsgIFxuXG4gICAgICAgIGlmIChNYXRoLmFicyhhbHRpdHVkZSAtIDQ1KSA8IDAuNSkge1xuICAgICAgICAgIHRhcmdldFRpbWUgPSB0aW1lO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0VGltZSkge1xuICAgICAgICBzZXRSZXN1bHQoYFRpbWUgd2hlbiBzdW4gaXMgYXQgNDXCsDogJHt0YXJnZXRUaW1lLnRvTG9jYWxlVGltZVN0cmluZygpfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0UmVzdWx0KCdUaGUgc3VuIGRvZXMgbm90IHJlYWNoIDQ1wrAgYXQgdGhpcyBsb2NhdGlvbiBvbiB0aGlzIGRhdGUuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHRhbuKBu8K5KDIpIHdoaWNoIGNvcnJlc3BvbmRzIHRvIH42My40M8KwXG4gICAgaWYgKE1hdGguYWJzKHBhcnNlZEFuZ2xlIC0gTWF0aC5hdGFuKDIpICogKDE4MCAvIE1hdGguUEkpKSA8IDAuNSkge1xuICAgICAgbGV0IHRhcmdldFRpbWUgPSBudWxsO1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxNDQwOyBpICs9IDUpIHsgIFxuICAgICAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpLCAwLCBpKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBTdW5DYWxjLmdldFBvc2l0aW9uKHRpbWUsIGxhdCwgbG5nKTtcbiAgICAgICAgY29uc3QgYWx0aXR1ZGUgPSAocG9zaXRpb24uYWx0aXR1ZGUgKiAxODApIC8gTWF0aC5QSTsgIFxuXG4gICAgICAgIGlmIChNYXRoLmFicyhhbHRpdHVkZSAtIDYzLjQzKSA8IDAuNSkge1xuICAgICAgICAgIHRhcmdldFRpbWUgPSB0aW1lO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0VGltZSkge1xuICAgICAgICBzZXRSZXN1bHQoYFRpbWUgd2hlbiBzdW4gaXMgYXQgdGFu4oG7wrkoMikgKDYzLjQzwrApOiAke3RhcmdldFRpbWUudG9Mb2NhbGVUaW1lU3RyaW5nKCl9YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRSZXN1bHQoJ1RoZSBzdW4gZG9lcyBub3QgcmVhY2ggNjMuNDPCsCBhdCB0aGlzIGxvY2F0aW9uIG9uIHRoaXMgZGF0ZS4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgMMKwIChTdW5zZXQpXG4gICAgaWYgKHBhcnNlZEFuZ2xlID09PSAwKSB7XG4gICAgICBzZXRSZXN1bHQoYFN1bnNldDogJHt0aW1lcy5zdW5zZXQudG9Mb2NhbGVUaW1lU3RyaW5nKCl9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIC0xNcKwIChFdmVuaW5nIGNpdmlsIHR3aWxpZ2h0KVxuICAgIGlmIChwYXJzZWRBbmdsZSA9PT0gLTE1KSB7XG4gICAgICBjb25zdCBkdXNrVGltZSA9IHRpbWVzLmR1c2sgPyB0aW1lcy5kdXNrLnRvTG9jYWxlVGltZVN0cmluZygpIDogJ05vIGR1c2sgdGltZSBhdmFpbGFibGUnO1xuICAgICAgc2V0UmVzdWx0KGAtMTXCsCBFdmVuaW5nIENpdmlsIFR3aWxpZ2h0OiAke2R1c2tUaW1lfWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBvdGhlciBhbmdsZXNcbiAgICBsZXQgdGFyZ2V0VGltZSA9IG51bGw7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTQ0MDsgaSArPSA1KSB7ICBcbiAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksIDAsIGkpO1xuICAgICAgY29uc3QgcG9zaXRpb24gPSBTdW5DYWxjLmdldFBvc2l0aW9uKHRpbWUsIGxhdCwgbG5nKTtcbiAgICAgIGNvbnN0IGFsdGl0dWRlID0gKHBvc2l0aW9uLmFsdGl0dWRlICogMTgwKSAvIE1hdGguUEk7ICBcblxuICAgICAgaWYgKE1hdGguYWJzKGFsdGl0dWRlIC0gcGFyc2VkQW5nbGUpIDwgMC41KSB7XG4gICAgICAgIHRhcmdldFRpbWUgPSB0aW1lO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldFRpbWUpIHtcbiAgICAgIHNldFJlc3VsdChgVGhlIHN1biBkb2VzIG5vdCByZWFjaCBhbiBhbHRpdHVkZSBvZiAke3BhcnNlZEFuZ2xlfcKwIGF0IHRoaXMgbG9jYXRpb24gb24gdGhpcyBkYXRlLmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN1bnJpc2UgPSB0aW1lcy5zdW5yaXNlLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICAgIGNvbnN0IHN1bnNldCA9IHRpbWVzLnN1bnNldC50b0xvY2FsZVRpbWVTdHJpbmcoKTtcbiAgICBjb25zdCBhbHRpdHVkZU5vdyA9IChTdW5DYWxjLmdldFBvc2l0aW9uKG5ldyBEYXRlKCksIGxhdCwgbG5nKS5hbHRpdHVkZSAqIDE4MCkgLyBNYXRoLlBJO1xuXG4gICAgc2V0UmVzdWx0KGBcbiAgICAgIFN1bnJpc2U6ICR7c3VucmlzZX0sXG4gICAgICBTdW5zZXQ6ICR7c3Vuc2V0fSxcbiAgICAgIEN1cnJlbnQgQWx0aXR1ZGU6ICR7YWx0aXR1ZGVOb3cudG9GaXhlZCgyKX3CsCxcbiAgICAgIFRpbWUgYXQgJHtwYXJzZWRBbmdsZX3CsDogJHt0YXJnZXRUaW1lLnRvTG9jYWxlVGltZVN0cmluZygpfVxuICAgIGApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgcC0xMSBtLTExXCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRMb2NhdGlvbihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgY2l0eVwiXG4gICAgICAgIGNsYXNzTmFtZT1cImJnLXRyYW5zcGFyZW50IHctOTYgcC0yIGJvcmRlciBib3JkZXItZ3JheS00MDAgbWItNFwiXG4gICAgICAvPlxuICAgICAgPGlucHV0XG4gICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QW5nbGUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGFuZ2xlICgtOTDCsCB0byA5MMKwKSBvciAnTWF4IEhlaWdodCdcIlxuICAgICAgICBjbGFzc05hbWU9XCJiZy10cmFuc3BhcmVudCB3LTk2IHAtMiBib3JkZXIgYm9yZGVyLWdyYXktNDAwIG1iLTRcIlxuICAgICAgLz5cbiAgICAgIDxidXR0b25cbiAgICAgICAgb25DbGljaz17Y2FsY3VsYXRlTWFpbn1cbiAgICAgICAgY2xhc3NOYW1lPVwicC0yIHctMTQgYmctYmx1ZS01MDAgdGV4dC13aGl0ZSByb3VuZGVkLW1kIGhvdmVyOmJnLWJsdWUtNjAwXCJcbiAgICAgID5cbiAgICAgICAgR29cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHRleHQtbGdcIj57cmVzdWx0fTwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbImF4aW9zIiwidXNlU3RhdGUiLCJTdW5DYWxjIiwiSG9tZSIsImxvY2F0aW9uIiwic2V0TG9jYXRpb24iLCJhbmdsZSIsInNldEFuZ2xlIiwicmVzdWx0Iiwic2V0UmVzdWx0IiwiY2FsY3VsYXRlTWFpbiIsImFwaSIsInJlc3BvbnNlIiwiZ2V0IiwiZGF0YSIsInJlc3VsdHMiLCJsZW5ndGgiLCJsYXQiLCJsbmciLCJnZW9tZXRyeSIsImNhbGN1bGF0ZVN1bkRhdGEiLCJlcnJvciIsImNvbnNvbGUiLCJ0aW1lcyIsImdldFRpbWVzIiwiRGF0ZSIsInN1bnJpc2UiLCJzdW5zZXQiLCJ1c2VyQW5nbGUiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJtYXhIZWlnaHRUaW1lIiwic29sYXJOb29uIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwicGFyc2VkQW5nbGUiLCJwYXJzZUZsb2F0IiwiaXNOYU4iLCJkYXduVGltZSIsImRhd24iLCJ0YXJnZXRUaW1lIiwiZGF0ZSIsImkiLCJ0aW1lIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJwb3NpdGlvbiIsImdldFBvc2l0aW9uIiwiYWx0aXR1ZGUiLCJNYXRoIiwiUEkiLCJhYnMiLCJhdGFuIiwiZHVza1RpbWUiLCJkdXNrIiwiYWx0aXR1ZGVOb3ciLCJ0b0ZpeGVkIiwiZGl2IiwiY2xhc3NOYW1lIiwiaW5wdXQiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInBsYWNlaG9sZGVyIiwiYnV0dG9uIiwib25DbGljayJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.js\n"));

/***/ })

});