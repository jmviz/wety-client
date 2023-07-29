/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.ts":
/*!********************!*\
  !*** ./src/api.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"API_BASE_URL\": () => (/* binding */ API_BASE_URL)\n/* harmony export */ });\nfunction apiBaseUrl() {\n    switch (window.location.hostname) {\n        case \"www.wety.org\":\n        case \"wety.org\":\n            return \"https://api.wety.org/\";\n        default:\n            // to test only on the machine running this client server, uncomment\n            // this line and comment the line below it:\n            // return \"http://127.0.0.1:3000/\";\n            // to test on other devices on your network, comment the above line\n            // and replace the below line with the local IP address for the\n            // machine running this client server, e.g.:\n            return \"http://192.168.0.88:3000/\";\n    }\n}\nconst API_BASE_URL = apiBaseUrl();\n\n\n//# sourceURL=webpack:///./src/api.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.ts\");\n/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./item */ \"./src/item.ts\");\n/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search */ \"./src/search.ts\");\n/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tree */ \"./src/tree.ts\");\n/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tooltip */ \"./src/tooltip.ts\");\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/item.ts":
/*!*********************!*\
  !*** ./src/item.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n\n//# sourceURL=webpack:///./src/item.ts?");

/***/ }),

/***/ "./src/search.ts":
/*!***********************!*\
  !*** ./src/search.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ITEM_SEARCH\": () => (/* binding */ ITEM_SEARCH),\n/* harmony export */   \"LANG_SEARCH\": () => (/* binding */ LANG_SEARCH)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.ts\");\n/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tree */ \"./src/tree.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n////////////////////////\n// Base Search Class\n////////////////////////\nclass Input {\n    constructor(elementId) {\n        this.element = document.getElementById(elementId);\n    }\n    getQueryValue() {\n        return encodeURIComponent(this.element.value.trim().toLowerCase());\n    }\n}\nclass SuggestionsList {\n    constructor(elementId) {\n        this.data = [];\n        this.element = document.getElementById(elementId);\n        this.elementHovered = false;\n        this.items = [];\n        this.activeItemIndex = null;\n        this.element.addEventListener(\"pointerover\", () => {\n            this.elementHovered = true;\n        });\n        this.element.addEventListener(\"pointerout\", () => {\n            this.elementHovered = false;\n        });\n    }\n    addItem(li) {\n        this.element.appendChild(li);\n        this.items.push(li);\n    }\n    hide() {\n        this.element.classList.add(\"hidden\");\n    }\n    show() {\n        this.element.classList.remove(\"hidden\");\n    }\n    clear() {\n        this.element.innerHTML = \"\";\n        this.hide();\n        this.items = [];\n        this.activeItemIndex = null;\n    }\n    updateActiveItem(newIndex) {\n        const oldActive = this.activeItemIndex !== null\n            ? this.items[this.activeItemIndex]\n            : null;\n        oldActive === null || oldActive === void 0 ? void 0 : oldActive.classList.remove(\"highlighted\");\n        this.activeItemIndex = newIndex;\n        const newActive = this.activeItemIndex !== null\n            ? this.items[this.activeItemIndex]\n            : null;\n        newActive === null || newActive === void 0 ? void 0 : newActive.classList.add(\"highlighted\");\n    }\n    adjustScroll() {\n        const active = this.activeItemIndex !== null\n            ? this.items[this.activeItemIndex]\n            : null;\n        if (active === null)\n            return;\n        const activeRect = active.getBoundingClientRect();\n        const listRect = this.element.getBoundingClientRect();\n        if (activeRect.bottom > listRect.bottom) {\n            this.element.scrollTop += activeRect.bottom - listRect.bottom;\n        }\n        else if (activeRect.top < listRect.top) {\n            this.element.scrollTop -= listRect.top - activeRect.top;\n        }\n    }\n}\nclass Search {\n    constructor(config) {\n        this.selectedId = null;\n        this.input = config.input;\n        this.suggestionsList = config.suggestionsList;\n        this.apiEndpoint = config.apiEndpoint;\n        this.nextFocus = config.nextFocus;\n        this.input.element.addEventListener(\"input\", () => this.handleInput());\n        this.input.element.addEventListener(\"keydown\", (event) => this.handleKeydown(event));\n        this.input.element.addEventListener(\"blur\", () => this.handleBlur());\n    }\n    handleInput() {\n        this.selectedId = null;\n        window.clearTimeout(this.apiEndpoint.timeout);\n        this.apiEndpoint.timeout = window.setTimeout(() => this.fetchSuggestions(), this.apiEndpoint.timeoutDuration);\n    }\n    handleKeydown(event) {\n        if (this.suggestionsList.data.length === 0)\n            return;\n        const lastIndex = this.suggestionsList.data.length - 1;\n        const activeIndex = this.suggestionsList.activeItemIndex;\n        let newActiveIndex = null;\n        switch (event.key) {\n            case \"Escape\":\n                this.suggestionsList.hide();\n                break;\n            case \"ArrowDown\":\n                event.preventDefault();\n                if (activeIndex === null || activeIndex >= lastIndex) {\n                    newActiveIndex = 0;\n                }\n                else {\n                    newActiveIndex = activeIndex + 1;\n                }\n                break;\n            case \"ArrowUp\":\n                event.preventDefault();\n                if (activeIndex === null || activeIndex <= 0) {\n                    newActiveIndex = lastIndex;\n                }\n                else {\n                    newActiveIndex = activeIndex - 1;\n                }\n                break;\n            case \"Enter\":\n                if (activeIndex !== null &&\n                    this.suggestionsList.data[activeIndex]) {\n                    this.setSelected(this.suggestionsList.data[activeIndex]);\n                }\n                break;\n        }\n        this.suggestionsList.updateActiveItem(newActiveIndex);\n        this.suggestionsList.adjustScroll();\n    }\n    handleBlur() {\n        // Prevent the suggestions list from being hidden when user presses\n        // \"Done\" on virtual keyboard, thereby unfocusing the input element.\n        const hasTouch = \"ontouchstart\" in window;\n        const hasFinePointer = window.matchMedia(\"(pointer: fine)\").matches;\n        const hasTouchOnly = hasTouch && !hasFinePointer;\n        if ((hasTouchOnly || this.suggestionsList.elementHovered) &&\n            this.selectedId === null) {\n            return;\n        }\n        this.suggestionsList.hide();\n    }\n    fetchSuggestions() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const query = this.input.getQueryValue();\n            if (!query) {\n                this.suggestionsList.clear();\n                return;\n            }\n            try {\n                const data = yield this.apiEndpoint.fetch(query);\n                console.log(data);\n                this.suggestionsList.data = data;\n                this.displaySuggestions();\n            }\n            catch (error) {\n                console.error(error);\n            }\n        });\n    }\n    displaySuggestions() {\n        this.suggestionsList.clear();\n        if (this.suggestionsList.data.length === 0)\n            return;\n        for (let i = 0; i < this.suggestionsList.data.length; i++) {\n            const suggestion = this.suggestionsList.data[i];\n            const li = suggestion.createListElement();\n            li.classList.add(\"suggestion-item\");\n            li.addEventListener(\"pointerup\", () => {\n                this.setSelected(suggestion);\n            });\n            li.addEventListener(\"pointerover\", () => {\n                this.suggestionsList.updateActiveItem(i);\n            });\n            this.suggestionsList.addItem(li);\n        }\n        this.suggestionsList.show();\n    }\n    setSelected(suggestion) {\n        var _a;\n        this.input.element.value = suggestion.inputValue();\n        this.selectedId = suggestion.getId();\n        this.suggestionsList.hide();\n        (_a = this.nextFocus) === null || _a === void 0 ? void 0 : _a.focus();\n    }\n}\nclass LangSuggestion {\n    constructor(data) {\n        this.code = data.code;\n        this.id = data.id;\n        this.items = data.items;\n        this.name = data.name;\n        this.similarity = data.similarity;\n    }\n    getId() {\n        return this.id;\n    }\n    createListElement() {\n        const el = document.createElement(\"li\");\n        el.textContent = this.name;\n        return el;\n    }\n    inputValue() {\n        return this.name;\n    }\n}\nclass LangSearchApiEndpoint {\n    constructor() {\n        this.timeout = undefined;\n        this.timeoutDuration = 500;\n    }\n    fetch(query) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const response = yield fetch(`${_api__WEBPACK_IMPORTED_MODULE_0__.API_BASE_URL}langs/${query}`);\n            const data = (yield response.json());\n            return data.map((d) => new LangSuggestion(d));\n        });\n    }\n}\nclass LangSearch extends Search {\n    constructor() {\n        const input = new Input(\"lang-search-input\");\n        const suggestionsList = new SuggestionsList(\"lang-search-suggestions\");\n        const apiEndpoint = new LangSearchApiEndpoint();\n        const nextFocus = document.getElementById(\"item-search-input\");\n        const config = { input, suggestionsList, apiEndpoint, nextFocus };\n        super(config);\n        this.lastLangName = null;\n        this.lastLangId = null;\n        this.getStoredLastLang();\n    }\n    getStoredLastLang() {\n        var _a;\n        return __awaiter(this, void 0, void 0, function* () {\n            const lastLangName = window.localStorage.getItem(\"lastLangName\");\n            const lastLangId = parseInt(window.localStorage.getItem(\"lastLangId\") || \"\");\n            if (lastLangName === null || isNaN(lastLangId)) {\n                this.input.element.focus();\n                return;\n            }\n            try {\n                console.log(`Checking that stored last lang with name ${lastLangName} and id ${lastLangId} is still valid...`);\n                const data = yield this.apiEndpoint.fetch(lastLangName);\n                console.log(data);\n                const lang = data[0];\n                if (lang.inputValue() === lastLangName &&\n                    lang.getId() === lastLangId) {\n                    console.log(\"Check succeeded, using stored last lang.\");\n                    this.setSelected(lang);\n                    (_a = this.nextFocus) === null || _a === void 0 ? void 0 : _a.focus();\n                    return;\n                }\n                throw new Error(\"invalid stored last lang\");\n            }\n            catch (error) {\n                this.input.element.value = \"\";\n                this.input.element.focus();\n                console.log(\"Check failed, clearing stored last lang. Probably the data was updated since your last visit.\");\n                this.lastLangName = null;\n                this.lastLangId = null;\n                window.localStorage.removeItem(\"lastLangName\");\n                window.localStorage.removeItem(\"lastLangId\");\n                return;\n            }\n        });\n    }\n    setSelected(suggestion) {\n        window.localStorage.setItem(\"lastLangName\", suggestion.inputValue());\n        window.localStorage.setItem(\"lastLangId\", suggestion.getId().toString());\n        super.setSelected(suggestion);\n    }\n}\nconst LANG_SEARCH = new LangSearch();\nclass ItemSuggestion {\n    constructor(data) {\n        this.distance = data.distance;\n        this.item = data.item;\n    }\n    getId() {\n        return this.item.id;\n    }\n    createListElement() {\n        var _a, _b;\n        const el = document.createElement(\"li\");\n        const termLine = document.createElement(\"div\");\n        termLine.classList.add(\"term-line\");\n        termLine.innerHTML = this.item.term;\n        el.appendChild(termLine);\n        const posList = (_a = this.item.pos) !== null && _a !== void 0 ? _a : [];\n        const glossList = (_b = this.item.gloss) !== null && _b !== void 0 ? _b : [];\n        for (let i = 0; i < posList.length; i++) {\n            const pos = posList[i];\n            const gloss = glossList[i];\n            const posLine = document.createElement(\"div\");\n            posLine.classList.add(\"pos-line\");\n            posLine.innerHTML = `<span class=\"pos\">${pos}</span>: <span class=\"gloss\">${gloss}</span>`;\n            el.appendChild(posLine);\n        }\n        return el;\n    }\n    inputValue() {\n        return this.item.term;\n    }\n}\nclass ItemSearchApiEndpoint {\n    constructor() {\n        this.timeout = undefined;\n        this.timeoutDuration = 500;\n    }\n    fetch(query) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const lang = LANG_SEARCH.selectedId;\n            const response = yield fetch(`${_api__WEBPACK_IMPORTED_MODULE_0__.API_BASE_URL}items/${lang}/${query}`);\n            const data = (yield response.json());\n            return data.map((d) => new ItemSuggestion(d));\n        });\n    }\n}\nclass ItemSearch extends Search {\n    constructor() {\n        const input = new Input(\"item-search-input\");\n        const suggestionsList = new SuggestionsList(\"item-search-suggestions\");\n        const apiEndpoint = new ItemSearchApiEndpoint();\n        const nextFocus = null;\n        const config = { input, suggestionsList, apiEndpoint, nextFocus };\n        super(config);\n        this.treeFetchTimeout = undefined;\n        this.treeFetchTimeoutDuration = 0;\n    }\n    setSelected(suggestion) {\n        super.setSelected(suggestion);\n        const lang = LANG_SEARCH.selectedId;\n        if (lang === null)\n            return;\n        window.clearTimeout(this.treeFetchTimeout);\n        this.treeFetchTimeout = window.setTimeout(_tree__WEBPACK_IMPORTED_MODULE_1__.getHeadProgenitorTree, this.treeFetchTimeoutDuration);\n    }\n}\nconst ITEM_SEARCH = new ItemSearch();\n\n\n//# sourceURL=webpack:///./src/search.ts?");

/***/ }),

/***/ "./src/tooltip.ts":
/*!************************!*\
  !*** ./src/tooltip.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setNodeTooltipListeners\": () => (/* binding */ setNodeTooltipListeners)\n/* harmony export */ });\n/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree */ \"./src/tree.ts\");\n\nconst tooltip = document.getElementById(\"tooltip\");\nlet tooltipHideTimeout;\nlet tooltipShowTimeout;\ntooltip.addEventListener(\"pointerenter\", (event) => {\n    if (event.pointerType === \"mouse\") {\n        window.clearTimeout(tooltipHideTimeout);\n    }\n});\ntooltip.addEventListener(\"pointerleave\", (event) => {\n    if (event.pointerType === \"mouse\") {\n        window.clearTimeout(tooltipShowTimeout);\n        tooltipHideTimeout = window.setTimeout(hideTooltip, 100);\n    }\n});\nfunction setNodeTooltipListeners(node) {\n    // for non-mouse, show tooltip on pointerup\n    node.on(\"pointerup\", function (event, d) {\n        if (event.pointerType !== \"mouse\") {\n            showTooltip(d.node, this, \"fixed\");\n        }\n    });\n    // for mouse, show tooltip on hover\n    node.on(\"pointerenter\", function (event, d) {\n        if (event.pointerType === \"mouse\") {\n            window.clearTimeout(tooltipHideTimeout);\n            tooltipShowTimeout = window.setTimeout(() => {\n                showTooltip(d.node, this, \"hover\");\n            }, 100);\n        }\n    });\n    node.on(\"pointerleave\", (event) => {\n        if (event.pointerType === \"mouse\") {\n            window.clearTimeout(tooltipShowTimeout);\n            tooltipHideTimeout = window.setTimeout(hideTooltip, 100);\n        }\n    });\n}\nfunction etyPrep(etyMode) {\n    switch (etyMode) {\n        case \"derived\":\n        case \"undefined derivation\":\n        case \"inherited\":\n        case \"borrowed\":\n        case \"back-formation\":\n            return \"from\";\n        case \"compound\":\n        case \"univerbation\":\n        case \"transfix\":\n        case \"surface analysis\":\n        case \"suffix\":\n        case \"prefix\":\n        case \"infix\":\n        case \"confix\":\n        case \"circumfix\":\n        case \"blend\":\n        case \"affix\":\n            return \"with\";\n        case \"vṛddhi\":\n        case \"vṛddhi-ya\":\n            return \"derivative of\";\n        case \"root\":\n            return \"reflex of\";\n        case \"mention\":\n            return \"in\";\n        default:\n            return \"of\";\n    }\n}\nfunction setTooltipHTML(selection, type) {\n    var _a, _b;\n    tooltip.innerHTML = \"\";\n    if (type === \"fixed\") {\n        const closeButton = document.createElement(\"button\");\n        closeButton.textContent = \"✕\";\n        closeButton.classList.add(\"close-button\");\n        tooltip.appendChild(closeButton);\n        closeButton.addEventListener(\"pointerup\", hideTooltip);\n    }\n    const item = selection.data.item;\n    const parent = selection.parent\n        ? {\n            lang: selection.parent.data.item.lang,\n            term: selection.parent.data.item.term,\n            langDistance: selection.parent.data.langDistance,\n        }\n        : null;\n    const lang = document.createElement(\"p\");\n    lang.classList.add(\"lang\");\n    lang.style.color = (0,_tree__WEBPACK_IMPORTED_MODULE_0__.langColor)(selection.data.langDistance);\n    lang.textContent = `${item.lang}`;\n    tooltip.appendChild(lang);\n    const term = document.createElement(\"p\");\n    term.innerHTML =\n        `<span class=\"term\">${item.term}</span>` +\n            (item.romanization\n                ? ` <span class=\"romanization\">(${item.romanization})</span>`\n                : \"\");\n    tooltip.appendChild(term);\n    if (item.imputed) {\n        const imputed = document.createElement(\"div\");\n        imputed.classList.add(\"pos-line\");\n        imputed.innerHTML = `<span class=\"imputed\">(imputed)</span>`;\n        tooltip.appendChild(imputed);\n    }\n    else if (item.pos &&\n        item.gloss &&\n        item.pos.length === item.gloss.length) {\n        const posGloss = document.createElement(\"div\");\n        const posList = (_a = item.pos) !== null && _a !== void 0 ? _a : [];\n        const glossList = (_b = item.gloss) !== null && _b !== void 0 ? _b : [];\n        for (let i = 0; i < posList.length; i++) {\n            const pos = posList[i];\n            const gloss = glossList[i];\n            const posLine = document.createElement(\"div\");\n            posLine.classList.add(\"pos-line\");\n            posLine.innerHTML = `<span class=\"pos\">${pos}</span>: <span class=\"gloss\">${gloss}</span>`;\n            posGloss.appendChild(posLine);\n        }\n        tooltip.appendChild(posGloss);\n    }\n    if (item.etyMode && parent) {\n        const ety = document.createElement(\"div\");\n        ety.classList.add(\"ety-line\");\n        const prep = etyPrep(item.etyMode);\n        const color = (0,_tree__WEBPACK_IMPORTED_MODULE_0__.langColor)(parent.langDistance);\n        ety.innerHTML = `<span class=\"ety-mode\">${item.etyMode}</span> <span class=\"ety-prep\">${prep}</span> <span class=\"parent-lang\" style=\"color: ${color};\">${parent.lang}</span> <span class=\"parent-term\">${parent.term}</span>`;\n        tooltip.appendChild(ety);\n    }\n    if (item.url) {\n        const container = document.createElement(\"div\");\n        container.classList.add(\"wiktionary-link-container\");\n        const link = document.createElement(\"a\");\n        link.textContent = \"Wiktionary\";\n        link.href = item.url;\n        link.target = \"_blank\";\n        link.classList.add(\"wiktionary-link\");\n        container.appendChild(link);\n        tooltip.appendChild(container);\n    }\n}\nfunction positionHoverTooltip(element) {\n    tooltip.style.position = \"absolute\";\n    const tooltipRect = tooltip.getBoundingClientRect();\n    const elementRect = element.getBoundingClientRect();\n    // Position the tooltip above the element. If there is not enough space,\n    // position it below the element.\n    if (elementRect.top >= tooltipRect.height) {\n        tooltip.style.top =\n            elementRect.top + window.scrollY - tooltipRect.height + \"px\";\n    }\n    else {\n        tooltip.style.top = elementRect.bottom + window.scrollY + \"px\";\n    }\n    // Align the tooltip with the left side of the element. If there is not\n    // enough space, align it with the right side.\n    if (elementRect.left + tooltipRect.width <= window.innerWidth) {\n        tooltip.style.left = elementRect.left + window.scrollX + \"px\";\n    }\n    else {\n        tooltip.style.left =\n            elementRect.right + window.scrollX - tooltipRect.width + \"px\";\n    }\n}\nfunction positionFixedTooltip() {\n    tooltip.style.position = \"fixed\";\n    tooltip.style.top = \"50%\";\n    tooltip.style.left = \"50%\";\n    tooltip.style.transform = \"translate(-50%, -50%)\";\n}\nfunction positionTooltip(element, type) {\n    if (type === \"hover\") {\n        positionHoverTooltip(element);\n    }\n    else {\n        positionFixedTooltip();\n    }\n}\nfunction showTooltip(node, element, type) {\n    hideTooltip();\n    setTooltipHTML(node, type);\n    positionTooltip(element, type);\n    tooltip.style.zIndex = \"9000\";\n    tooltip.style.opacity = \"1\";\n}\nfunction hideTooltip() {\n    tooltip.style.opacity = \"0\";\n    tooltip.style.zIndex = \"-9000\";\n    tooltip.innerHTML = \"\";\n    tooltip.style.top = \"0px\";\n    tooltip.style.left = \"0px\";\n}\n\n\n//# sourceURL=webpack:///./src/tooltip.ts?");

/***/ }),

/***/ "./src/tree.ts":
/*!*********************!*\
  !*** ./src/tree.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getHeadProgenitorTree\": () => (/* binding */ getHeadProgenitorTree),\n/* harmony export */   \"langColor\": () => (/* binding */ langColor)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.ts\");\n/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search */ \"./src/search.ts\");\n/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltip */ \"./src/tooltip.ts\");\n/* harmony import */ var _treeCluster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./treeCluster */ \"./src/treeCluster.ts\");\n/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-selection */ \"./node_modules/d3-selection/src/create.js\");\n/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-shape */ \"./node_modules/d3-shape/src/link.js\");\n/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! d3-shape */ \"./node_modules/d3-shape/src/curve/step.js\");\n/* harmony import */ var d3_hierarchy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-hierarchy */ \"./node_modules/d3-hierarchy/src/hierarchy/index.js\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\n\n\nconst ety = document.getElementById(\"ety\");\nlet treeData = null;\nfunction getHeadProgenitorTree() {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const lang = _search__WEBPACK_IMPORTED_MODULE_1__.LANG_SEARCH.selectedId;\n            const item = _search__WEBPACK_IMPORTED_MODULE_1__.ITEM_SEARCH.selectedId;\n            const response = yield fetch(`${_api__WEBPACK_IMPORTED_MODULE_0__.API_BASE_URL}headProgenitorTree/${item}?lang=${lang}`);\n            treeData = yield response.json();\n            console.log(treeData);\n            displayHeadProgenitorTree();\n        }\n        catch (error) {\n            console.error(error);\n        }\n    });\n}\nfunction displayHeadProgenitorTree() {\n    ety.innerHTML = \"\";\n    if (treeData === null)\n        return;\n    const { svgElement: svgElement, nodeSelection: nodeSelection, nodeBackgroundSelection: nodeBackgroundSelection, } = headProgenitorTreeSVG(treeData);\n    if (svgElement === null)\n        return;\n    svgElement.setAttribute(\"id\", \"tree\");\n    svgElement.style.opacity = \"0\";\n    ety.appendChild(svgElement);\n    addSVGTextBackgrounds(nodeSelection, nodeBackgroundSelection);\n    window.scrollTo(document.body.scrollWidth, 0);\n    svgElement.style.opacity = \"1\";\n}\n// https://accessiblepalette.com/?lightness=98.2,93.95,85.1,76.5,67.65,52,47.6,40.4,32.4,23.55&770039=1,12&720614=1,0&672000=1,0&493500=1,0&224000=1,0&004300=1,0&004a32=1,0&004f64=1,0&004e94=1,0&003c88=1,0&2e2d79=1,0&750039=1,0\nconst langDistanceColors = [\n    \"#2F2E7A\",\n    \"#0B3577\",\n    \"#143867\",\n    \"#0D3D4D\",\n    \"#06412C\",\n    \"#004300\",\n    \"#224000\",\n    \"#493500\",\n    \"#672001\",\n    \"#740A16\",\n    \"#740549\",\n    \"#730138\",\n];\nconst langUnrelatedColor = \"#696969\";\nfunction langColor(distance) {\n    if (distance === null)\n        return langUnrelatedColor;\n    if (distance < 0)\n        return langDistanceColors[0];\n    if (distance > langDistanceColors.length)\n        return langDistanceColors[langDistanceColors.length - 1];\n    return langDistanceColors[distance];\n}\n// The basic skeleton of this function is adapted from:\n//\n// https://observablehq.com/@d3/tree\n//\n// which has the following copyright and license notice:\n//\n// Copyright 2021 Observable, Inc.\n// Released under the ISC license.\nfunction headProgenitorTreeSVG(data) {\n    var _a;\n    // https://github.com/d3/d3-hierarchy#hierarchy\n    const root = (0,d3_hierarchy__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(data, (d) => d.children);\n    const searched = root.find((d) => d.data.item.id === _search__WEBPACK_IMPORTED_MODULE_1__.ITEM_SEARCH.selectedId);\n    const searchedAncestors = (_a = searched === null || searched === void 0 ? void 0 : searched.ancestors()) !== null && _a !== void 0 ? _a : [];\n    root.count() // counts node leaves and assigns count to .value\n        .sort((a, b) => {\n        var _a, _b;\n        return +searchedAncestors.includes(a) -\n            +searchedAncestors.includes(b) ||\n            a.height - b.height ||\n            ((_a = a.value) !== null && _a !== void 0 ? _a : 0) - ((_b = b.value) !== null && _b !== void 0 ? _b : 0) ||\n            +(a.data.item.term < b.data.item.term) * 2 - 1;\n    });\n    // This assumes the font-size of the ety div is set to \"small\", as it should\n    // be in the stylesheet.\n    const small_font_px = parseFloat(window.getComputedStyle(ety).fontSize);\n    // There is a confusion between \"x\" and \"y\" concepts in the below. The d3\n    // api assumes that the tree is oriented vertically, with the root at the\n    // top and the leaves at the bottom. But we are using a horizontal tree,\n    // with the root on the left and the leaves on the right. So variables\n    // defined by d3 like e.g. `root.height` and `d.x` correspond in our case to\n    // width and y.\n    // const dx = 125;\n    // const dy = 12;\n    // const sep = 4;\n    const dx = 10 * small_font_px;\n    const dy = small_font_px;\n    const sep = Math.floor(0.25 * small_font_px);\n    const layout = (0,_treeCluster__WEBPACK_IMPORTED_MODULE_3__[\"default\"])()\n        .nodeSize([dy, dx])\n        .separation((a, b) => (a.parent == b.parent ? sep : sep));\n    const pointRoot = layout(root);\n    // Center the tree vertically.\n    let y0 = Infinity;\n    let y1 = -y0;\n    pointRoot.each((d) => {\n        if (d.x > y1)\n            y1 = d.x;\n        if (d.x < y0)\n            y0 = d.x;\n    });\n    // root.height is the number of links between the root and the furthest leaf.\n    const width = (root.height + 1) * dx;\n    const height = y1 - y0 + dy * 4;\n    const viewBox = [-dx / 2, y0 - dy * 2, width, height];\n    // crispEdges implementation quality varies from browser to browser. It\n    // generally seems to work well but for example Windows Firefox renders\n    // random lines with 2px instead of 1px. Consider this as a solution:\n    // https://github.com/engray/subpixelFix.\n    const svg = (0,d3_selection__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"svg\")\n        .attr(\"version\", \"1.1\")\n        .attr(\"xmlns\", \"http://www.w3.org/2000/svg\")\n        .attr(\"xmlns:xlink\", \"http://www.w3.org/1999/xlink\")\n        .attr(\"xmlns:xhtml\", \"http://www.w3.org/1999/xhtml\")\n        .attr(\"viewBox\", viewBox)\n        .attr(\"width\", width)\n        .attr(\"height\", height)\n        .attr(\"style\", `min-width: ${width}px; max-width: ${width}px; height: auto; height: intrinsic;`)\n        .attr(\"shape-rendering\", \"crispEdges\")\n        .attr(\"vector-effect\", \"non-scaling-stroke\")\n        .attr(\"text-anchor\", \"middle\")\n        .attr(\"text-rendering\", \"optimizeLegibility\")\n        // this noop event listener is to cajole mobile browsers (or, at least,\n        // ios webkit) into responding to touch events on svg elements, cf.\n        // https://stackoverflow.com/a/65777666/10658294\n        // eslint-disable-next-line @typescript-eslint/no-empty-function\n        .on(\"touchstart\", () => { });\n    // the lines forming the tree\n    svg.append(\"g\")\n        .attr(\"fill\", \"none\")\n        .attr(\"stroke\", \"#555\")\n        .attr(\"stroke-opacity\", 1.0)\n        .attr(\"stroke-linecap\", \"butt\")\n        .attr(\"stroke-linejoin\", \"miter\")\n        .attr(\"stroke-width\", 1.0)\n        .selectAll(\"path\")\n        .data(pointRoot.links())\n        .join(\"path\")\n        .attr(\"d\", (0,d3_shape__WEBPACK_IMPORTED_MODULE_6__.link)(d3_shape__WEBPACK_IMPORTED_MODULE_7__.stepBefore)\n        .x((d) => d.y)\n        .y((d) => d.x));\n    const descendants = pointRoot\n        .descendants()\n        .map(function (d) {\n        return { node: d, bbox: new DOMRect(0, 0, 0, 0) };\n    });\n    // placeholder rects for text backgrounds to be set in addSVGTextBackgrounds()\n    const nodeBackground = svg\n        .append(\"g\")\n        .selectAll(\"rect\")\n        .data(descendants)\n        .join(\"rect\")\n        .attr(\"fill\", \"white\");\n    // the text nodes\n    const node = svg\n        .append(\"g\")\n        .selectAll(\"g\")\n        .data(descendants)\n        .join(\"g\")\n        .attr(\"font-weight\", (d) => d.node.data.item.id == _search__WEBPACK_IMPORTED_MODULE_1__.ITEM_SEARCH.selectedId ? \"bold\" : null)\n        .attr(\"transform\", (d) => `translate(${d.node.y},${d.node.x})`);\n    node.append(\"text\")\n        .attr(\"class\", \"lang\")\n        .attr(\"y\", \"-1em\")\n        .attr(\"fill\", (d) => langColor(d.node.data.langDistance))\n        .text((d) => d.node.data.item.lang);\n    node.append(\"text\")\n        .attr(\"class\", \"term\")\n        .attr(\"y\", \"0.25em\")\n        .text((d) => d.node.data.item.term);\n    node.append(\"text\")\n        .attr(\"class\", \"romanization\")\n        .attr(\"y\", \"1.5em\")\n        .text((d) => d.node.data.item.romanization\n        ? `(${d.node.data.item.romanization})`\n        : \"\");\n    (0,_tooltip__WEBPACK_IMPORTED_MODULE_2__.setNodeTooltipListeners)(node);\n    return {\n        svgElement: svg.node(),\n        nodeSelection: node,\n        nodeBackgroundSelection: nodeBackground,\n    };\n}\nfunction addSVGTextBackgrounds(node, nodeBackground) {\n    node.each(function (d) {\n        d.bbox = this.getBBox();\n    });\n    const xMargin = 3;\n    const yMargin = 3;\n    nodeBackground\n        .attr(\"width\", (d) => d.bbox.width + 2 * xMargin)\n        .attr(\"height\", (d) => d.bbox.height + 2 * yMargin)\n        .attr(\"transform\", function (d) {\n        const x = d.node.y - xMargin;\n        const y = d.node.x - yMargin;\n        return `translate(${x},${y})`;\n    })\n        .attr(\"x\", (d) => d.bbox.x)\n        .attr(\"y\", (d) => d.bbox.y);\n}\n\n\n//# sourceURL=webpack:///./src/tree.ts?");

/***/ }),

/***/ "./src/treeCluster.ts":
/*!****************************!*\
  !*** ./src/treeCluster.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ clusterLayout)\n/* harmony export */ });\n// This file is a typed and otherwise adapted version of\n// d3-hierarchy/src/cluster.js. The original copyright and license notice\n// follows:\n//\n// Copyright 2010-2021 Mike Bostock\n//\n// Permission to use, copy, modify, and/or distribute this software for any\n// purpose with or without fee is hereby granted, provided that the above\n// copyright notice and this permission notice appear in all copies.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH\n// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY\n// AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,\n// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM\n// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR\n// OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR\n// PERFORMANCE OF THIS SOFTWARE.\nfunction defaultSeparation(a, b) {\n    return a.parent === b.parent ? 1 : 2;\n}\nfunction minX(children) {\n    return children.reduce(minXReduce, 0);\n}\nfunction minXReduce(x, c) {\n    var _a;\n    return Math.min(x, (_a = c.x) !== null && _a !== void 0 ? _a : 0);\n}\nfunction maxY(children) {\n    return 1 + children.reduce(maxYReduce, 0);\n}\nfunction maxYReduce(y, c) {\n    var _a;\n    return Math.max(y, (_a = c.y) !== null && _a !== void 0 ? _a : 0);\n}\nfunction leafLeft(node) {\n    let children;\n    while ((children = node.children))\n        node = children[0];\n    return node;\n}\nfunction leafRight(node) {\n    let children;\n    while ((children = node.children))\n        node = children[children.length - 1];\n    return node;\n}\nfunction clusterLayout() {\n    let separation = defaultSeparation, dx = 1, dy = 1, nodeSize = false;\n    function cluster(root) {\n        var _a, _b;\n        let previousNode, x = 0;\n        const pointRoot = root;\n        // First walk, computing the initial x & y values.\n        pointRoot.eachAfter(function (node) {\n            const children = node.children;\n            if (children) {\n                node.x = minX(children);\n                node.y = maxY(children);\n            }\n            else {\n                node.x = previousNode\n                    ? (x -= separation(node, previousNode))\n                    : 0;\n                node.y = 0;\n                previousNode = node;\n            }\n        });\n        const left = leafLeft(pointRoot), right = leafRight(pointRoot), x0 = ((_a = left.x) !== null && _a !== void 0 ? _a : 0) - separation(left, right) / 2, x1 = ((_b = right.x) !== null && _b !== void 0 ? _b : 0) + separation(right, left) / 2;\n        // Second walk, normalizing x & y to the desired size.\n        return pointRoot.eachAfter(nodeSize\n            ? function (node) {\n                var _a, _b, _c, _d;\n                node.x = (((_a = node.x) !== null && _a !== void 0 ? _a : 0) - ((_b = pointRoot.x) !== null && _b !== void 0 ? _b : 0)) * dx;\n                node.y = (((_c = pointRoot.y) !== null && _c !== void 0 ? _c : 0) - ((_d = node.y) !== null && _d !== void 0 ? _d : 0)) * dy;\n            }\n            : function (node) {\n                var _a, _b;\n                node.x = ((((_a = node.x) !== null && _a !== void 0 ? _a : 0) - x0) / (x1 - x0)) * dx;\n                node.y =\n                    (1 - (pointRoot.y ? (_b = node.y) !== null && _b !== void 0 ? _b : 0 / pointRoot.y : 1)) *\n                        dy;\n            });\n    }\n    cluster.separation = function (x) {\n        return arguments.length ? ((separation = x), cluster) : separation;\n    };\n    cluster.size = function (x) {\n        if (arguments.length) {\n            nodeSize = false;\n            dx = x && x[0] !== undefined ? +x[0] : dx;\n            dy = x && x[1] !== undefined ? +x[1] : dy;\n            return cluster;\n        }\n        else {\n            return nodeSize ? [dx, dy] : null;\n        }\n    };\n    cluster.nodeSize = function (x) {\n        if (arguments.length) {\n            nodeSize = true;\n            dx = x && x[0] !== undefined ? +x[0] : dx;\n            dy = x && x[1] !== undefined ? +x[1] : dy;\n            return cluster;\n        }\n        else {\n            return nodeSize ? [dx, dy] : null;\n        }\n    };\n    return cluster;\n}\n\n\n//# sourceURL=webpack:///./src/treeCluster.ts?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/ancestors.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/ancestors.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  var node = this, nodes = [node];\n  while (node = node.parent) {\n    nodes.push(node);\n  }\n  return nodes;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/ancestors.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/count.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/count.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction count(node) {\n  var sum = 0,\n      children = node.children,\n      i = children && children.length;\n  if (!i) sum = 1;\n  else while (--i >= 0) sum += children[i].value;\n  node.value = sum;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return this.eachAfter(count);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/count.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/descendants.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/descendants.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return Array.from(this);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/descendants.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/each.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/each.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback, that) {\n  let index = -1;\n  for (const node of this) {\n    callback.call(that, node, ++index, this);\n  }\n  return this;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/each.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/eachAfter.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/eachAfter.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback, that) {\n  var node = this, nodes = [node], next = [], children, i, n, index = -1;\n  while (node = nodes.pop()) {\n    next.push(node);\n    if (children = node.children) {\n      for (i = 0, n = children.length; i < n; ++i) {\n        nodes.push(children[i]);\n      }\n    }\n  }\n  while (node = next.pop()) {\n    callback.call(that, node, ++index, this);\n  }\n  return this;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/eachAfter.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/eachBefore.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/eachBefore.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback, that) {\n  var node = this, nodes = [node], children, i, index = -1;\n  while (node = nodes.pop()) {\n    callback.call(that, node, ++index, this);\n    if (children = node.children) {\n      for (i = children.length - 1; i >= 0; --i) {\n        nodes.push(children[i]);\n      }\n    }\n  }\n  return this;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/eachBefore.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/find.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/find.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback, that) {\n  let index = -1;\n  for (const node of this) {\n    if (callback.call(that, node, ++index, this)) {\n      return node;\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/find.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Node\": () => (/* binding */ Node),\n/* harmony export */   \"computeHeight\": () => (/* binding */ computeHeight),\n/* harmony export */   \"default\": () => (/* binding */ hierarchy)\n/* harmony export */ });\n/* harmony import */ var _count_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./count.js */ \"./node_modules/d3-hierarchy/src/hierarchy/count.js\");\n/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./each.js */ \"./node_modules/d3-hierarchy/src/hierarchy/each.js\");\n/* harmony import */ var _eachBefore_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eachBefore.js */ \"./node_modules/d3-hierarchy/src/hierarchy/eachBefore.js\");\n/* harmony import */ var _eachAfter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eachAfter.js */ \"./node_modules/d3-hierarchy/src/hierarchy/eachAfter.js\");\n/* harmony import */ var _find_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./find.js */ \"./node_modules/d3-hierarchy/src/hierarchy/find.js\");\n/* harmony import */ var _sum_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sum.js */ \"./node_modules/d3-hierarchy/src/hierarchy/sum.js\");\n/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sort.js */ \"./node_modules/d3-hierarchy/src/hierarchy/sort.js\");\n/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./path.js */ \"./node_modules/d3-hierarchy/src/hierarchy/path.js\");\n/* harmony import */ var _ancestors_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ancestors.js */ \"./node_modules/d3-hierarchy/src/hierarchy/ancestors.js\");\n/* harmony import */ var _descendants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./descendants.js */ \"./node_modules/d3-hierarchy/src/hierarchy/descendants.js\");\n/* harmony import */ var _leaves_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./leaves.js */ \"./node_modules/d3-hierarchy/src/hierarchy/leaves.js\");\n/* harmony import */ var _links_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./links.js */ \"./node_modules/d3-hierarchy/src/hierarchy/links.js\");\n/* harmony import */ var _iterator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./iterator.js */ \"./node_modules/d3-hierarchy/src/hierarchy/iterator.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction hierarchy(data, children) {\n  if (data instanceof Map) {\n    data = [undefined, data];\n    if (children === undefined) children = mapChildren;\n  } else if (children === undefined) {\n    children = objectChildren;\n  }\n\n  var root = new Node(data),\n      node,\n      nodes = [root],\n      child,\n      childs,\n      i,\n      n;\n\n  while (node = nodes.pop()) {\n    if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {\n      node.children = childs;\n      for (i = n - 1; i >= 0; --i) {\n        nodes.push(child = childs[i] = new Node(childs[i]));\n        child.parent = node;\n        child.depth = node.depth + 1;\n      }\n    }\n  }\n\n  return root.eachBefore(computeHeight);\n}\n\nfunction node_copy() {\n  return hierarchy(this).eachBefore(copyData);\n}\n\nfunction objectChildren(d) {\n  return d.children;\n}\n\nfunction mapChildren(d) {\n  return Array.isArray(d) ? d[1] : null;\n}\n\nfunction copyData(node) {\n  if (node.data.value !== undefined) node.value = node.data.value;\n  node.data = node.data.data;\n}\n\nfunction computeHeight(node) {\n  var height = 0;\n  do node.height = height;\n  while ((node = node.parent) && (node.height < ++height));\n}\n\nfunction Node(data) {\n  this.data = data;\n  this.depth =\n  this.height = 0;\n  this.parent = null;\n}\n\nNode.prototype = hierarchy.prototype = {\n  constructor: Node,\n  count: _count_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  each: _each_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  eachAfter: _eachAfter_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  eachBefore: _eachBefore_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  find: _find_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  sum: _sum_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  sort: _sort_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  path: _path_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  ancestors: _ancestors_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  descendants: _descendants_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  leaves: _leaves_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n  links: _links_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n  copy: node_copy,\n  [Symbol.iterator]: _iterator_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]\n};\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/index.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/iterator.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function* __WEBPACK_DEFAULT_EXPORT__() {\n  var node = this, current, next = [node], children, i, n;\n  do {\n    current = next.reverse(), next = [];\n    while (node = current.pop()) {\n      yield node;\n      if (children = node.children) {\n        for (i = 0, n = children.length; i < n; ++i) {\n          next.push(children[i]);\n        }\n      }\n    }\n  } while (next.length);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/iterator.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/leaves.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/leaves.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  var leaves = [];\n  this.eachBefore(function(node) {\n    if (!node.children) {\n      leaves.push(node);\n    }\n  });\n  return leaves;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/leaves.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/links.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/links.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  var root = this, links = [];\n  root.each(function(node) {\n    if (node !== root) { // Don’t include the root’s parent, if any.\n      links.push({source: node.parent, target: node});\n    }\n  });\n  return links;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/links.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/path.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/path.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(end) {\n  var start = this,\n      ancestor = leastCommonAncestor(start, end),\n      nodes = [start];\n  while (start !== ancestor) {\n    start = start.parent;\n    nodes.push(start);\n  }\n  var k = nodes.length;\n  while (end !== ancestor) {\n    nodes.splice(k, 0, end);\n    end = end.parent;\n  }\n  return nodes;\n}\n\nfunction leastCommonAncestor(a, b) {\n  if (a === b) return a;\n  var aNodes = a.ancestors(),\n      bNodes = b.ancestors(),\n      c = null;\n  a = aNodes.pop();\n  b = bNodes.pop();\n  while (a === b) {\n    c = a;\n    a = aNodes.pop();\n    b = bNodes.pop();\n  }\n  return c;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/path.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/sort.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/sort.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(compare) {\n  return this.eachBefore(function(node) {\n    if (node.children) {\n      node.children.sort(compare);\n    }\n  });\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/sort.js?");

/***/ }),

/***/ "./node_modules/d3-hierarchy/src/hierarchy/sum.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-hierarchy/src/hierarchy/sum.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  return this.eachAfter(function(node) {\n    var sum = +value(node.data) || 0,\n        children = node.children,\n        i = children && children.length;\n    while (--i >= 0) sum += children[i].value;\n    node.value = sum;\n  });\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-hierarchy/src/hierarchy/sum.js?");

/***/ }),

/***/ "./node_modules/d3-path/src/path.js":
/*!******************************************!*\
  !*** ./node_modules/d3-path/src/path.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Path\": () => (/* binding */ Path),\n/* harmony export */   \"path\": () => (/* binding */ path),\n/* harmony export */   \"pathRound\": () => (/* binding */ pathRound)\n/* harmony export */ });\nconst pi = Math.PI,\n    tau = 2 * pi,\n    epsilon = 1e-6,\n    tauEpsilon = tau - epsilon;\n\nfunction append(strings) {\n  this._ += strings[0];\n  for (let i = 1, n = strings.length; i < n; ++i) {\n    this._ += arguments[i] + strings[i];\n  }\n}\n\nfunction appendRound(digits) {\n  let d = Math.floor(digits);\n  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);\n  if (d > 15) return append;\n  const k = 10 ** d;\n  return function(strings) {\n    this._ += strings[0];\n    for (let i = 1, n = strings.length; i < n; ++i) {\n      this._ += Math.round(arguments[i] * k) / k + strings[i];\n    }\n  };\n}\n\nclass Path {\n  constructor(digits) {\n    this._x0 = this._y0 = // start of current subpath\n    this._x1 = this._y1 = null; // end of current subpath\n    this._ = \"\";\n    this._append = digits == null ? append : appendRound(digits);\n  }\n  moveTo(x, y) {\n    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;\n  }\n  closePath() {\n    if (this._x1 !== null) {\n      this._x1 = this._x0, this._y1 = this._y0;\n      this._append`Z`;\n    }\n  }\n  lineTo(x, y) {\n    this._append`L${this._x1 = +x},${this._y1 = +y}`;\n  }\n  quadraticCurveTo(x1, y1, x, y) {\n    this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;\n  }\n  bezierCurveTo(x1, y1, x2, y2, x, y) {\n    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;\n  }\n  arcTo(x1, y1, x2, y2, r) {\n    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;\n\n    // Is the radius negative? Error.\n    if (r < 0) throw new Error(`negative radius: ${r}`);\n\n    let x0 = this._x1,\n        y0 = this._y1,\n        x21 = x2 - x1,\n        y21 = y2 - y1,\n        x01 = x0 - x1,\n        y01 = y0 - y1,\n        l01_2 = x01 * x01 + y01 * y01;\n\n    // Is this path empty? Move to (x1,y1).\n    if (this._x1 === null) {\n      this._append`M${this._x1 = x1},${this._y1 = y1}`;\n    }\n\n    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.\n    else if (!(l01_2 > epsilon));\n\n    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?\n    // Equivalently, is (x1,y1) coincident with (x2,y2)?\n    // Or, is the radius zero? Line to (x1,y1).\n    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {\n      this._append`L${this._x1 = x1},${this._y1 = y1}`;\n    }\n\n    // Otherwise, draw an arc!\n    else {\n      let x20 = x2 - x0,\n          y20 = y2 - y0,\n          l21_2 = x21 * x21 + y21 * y21,\n          l20_2 = x20 * x20 + y20 * y20,\n          l21 = Math.sqrt(l21_2),\n          l01 = Math.sqrt(l01_2),\n          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),\n          t01 = l / l01,\n          t21 = l / l21;\n\n      // If the start tangent is not coincident with (x0,y0), line to.\n      if (Math.abs(t01 - 1) > epsilon) {\n        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;\n      }\n\n      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;\n    }\n  }\n  arc(x, y, r, a0, a1, ccw) {\n    x = +x, y = +y, r = +r, ccw = !!ccw;\n\n    // Is the radius negative? Error.\n    if (r < 0) throw new Error(`negative radius: ${r}`);\n\n    let dx = r * Math.cos(a0),\n        dy = r * Math.sin(a0),\n        x0 = x + dx,\n        y0 = y + dy,\n        cw = 1 ^ ccw,\n        da = ccw ? a0 - a1 : a1 - a0;\n\n    // Is this path empty? Move to (x0,y0).\n    if (this._x1 === null) {\n      this._append`M${x0},${y0}`;\n    }\n\n    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).\n    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {\n      this._append`L${x0},${y0}`;\n    }\n\n    // Is this arc empty? We’re done.\n    if (!r) return;\n\n    // Does the angle go the wrong way? Flip the direction.\n    if (da < 0) da = da % tau + tau;\n\n    // Is this a complete circle? Draw two arcs to complete the circle.\n    if (da > tauEpsilon) {\n      this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;\n    }\n\n    // Is this arc non-empty? Draw an arc!\n    else if (da > epsilon) {\n      this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;\n    }\n  }\n  rect(x, y, w, h) {\n    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;\n  }\n  toString() {\n    return this._;\n  }\n}\n\nfunction path() {\n  return new Path;\n}\n\n// Allow instanceof d3.path\npath.prototype = Path.prototype;\n\nfunction pathRound(digits = 3) {\n  return new Path(+digits);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-path/src/path.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/array.js":
/*!************************************************!*\
  !*** ./node_modules/d3-selection/src/array.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ array)\n/* harmony export */ });\n// Given something array like (or null), returns something that is strictly an\n// array. This is used to ensure that array-like objects passed to d3.selectAll\n// or selection.selectAll are converted into proper arrays when creating a\n// selection; we don’t ever want to create a selection backed by a live\n// HTMLCollection or NodeList. However, note that selection.selectAll will use a\n// static NodeList as a group, since it safely derived from querySelectorAll.\nfunction array(x) {\n  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/array.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/constant.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-selection/src/constant.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {\n  return function() {\n    return x;\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/constant.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/create.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-selection/src/create.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./creator.js */ \"./node_modules/d3-selection/src/creator.js\");\n/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select.js */ \"./node_modules/d3-selection/src/select.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {\n  return (0,_select_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])((0,_creator_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(name).call(document.documentElement));\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/create.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/creator.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-selection/src/creator.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _namespace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./namespace.js */ \"./node_modules/d3-selection/src/namespace.js\");\n/* harmony import */ var _namespaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespaces.js */ \"./node_modules/d3-selection/src/namespaces.js\");\n\n\n\nfunction creatorInherit(name) {\n  return function() {\n    var document = this.ownerDocument,\n        uri = this.namespaceURI;\n    return uri === _namespaces_js__WEBPACK_IMPORTED_MODULE_0__.xhtml && document.documentElement.namespaceURI === _namespaces_js__WEBPACK_IMPORTED_MODULE_0__.xhtml\n        ? document.createElement(name)\n        : document.createElementNS(uri, name);\n  };\n}\n\nfunction creatorFixed(fullname) {\n  return function() {\n    return this.ownerDocument.createElementNS(fullname.space, fullname.local);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {\n  var fullname = (0,_namespace_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(name);\n  return (fullname.local\n      ? creatorFixed\n      : creatorInherit)(fullname);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/creator.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/matcher.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-selection/src/matcher.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"childMatcher\": () => (/* binding */ childMatcher),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {\n  return function() {\n    return this.matches(selector);\n  };\n}\n\nfunction childMatcher(selector) {\n  return function(node) {\n    return node.matches(selector);\n  };\n}\n\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/matcher.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/namespace.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-selection/src/namespace.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _namespaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespaces.js */ \"./node_modules/d3-selection/src/namespaces.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {\n  var prefix = name += \"\", i = prefix.indexOf(\":\");\n  if (i >= 0 && (prefix = name.slice(0, i)) !== \"xmlns\") name = name.slice(i + 1);\n  return _namespaces_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].hasOwnProperty(prefix) ? {space: _namespaces_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"][prefix], local: name} : name; // eslint-disable-line no-prototype-builtins\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/namespace.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/namespaces.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-selection/src/namespaces.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"xhtml\": () => (/* binding */ xhtml)\n/* harmony export */ });\nvar xhtml = \"http://www.w3.org/1999/xhtml\";\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  svg: \"http://www.w3.org/2000/svg\",\n  xhtml: xhtml,\n  xlink: \"http://www.w3.org/1999/xlink\",\n  xml: \"http://www.w3.org/XML/1998/namespace\",\n  xmlns: \"http://www.w3.org/2000/xmlns/\"\n});\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/namespaces.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/select.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-selection/src/select.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {\n  return typeof selector === \"string\"\n      ? new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.Selection([[document.querySelector(selector)]], [document.documentElement])\n      : new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.Selection([[selector]], _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.root);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/select.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/append.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/append.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creator.js */ \"./node_modules/d3-selection/src/creator.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {\n  var create = typeof name === \"function\" ? name : (0,_creator_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name);\n  return this.select(function() {\n    return this.appendChild(create.apply(this, arguments));\n  });\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/append.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/attr.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/attr.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _namespace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../namespace.js */ \"./node_modules/d3-selection/src/namespace.js\");\n\n\nfunction attrRemove(name) {\n  return function() {\n    this.removeAttribute(name);\n  };\n}\n\nfunction attrRemoveNS(fullname) {\n  return function() {\n    this.removeAttributeNS(fullname.space, fullname.local);\n  };\n}\n\nfunction attrConstant(name, value) {\n  return function() {\n    this.setAttribute(name, value);\n  };\n}\n\nfunction attrConstantNS(fullname, value) {\n  return function() {\n    this.setAttributeNS(fullname.space, fullname.local, value);\n  };\n}\n\nfunction attrFunction(name, value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (v == null) this.removeAttribute(name);\n    else this.setAttribute(name, v);\n  };\n}\n\nfunction attrFunctionNS(fullname, value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);\n    else this.setAttributeNS(fullname.space, fullname.local, v);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {\n  var fullname = (0,_namespace_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name);\n\n  if (arguments.length < 2) {\n    var node = this.node();\n    return fullname.local\n        ? node.getAttributeNS(fullname.space, fullname.local)\n        : node.getAttribute(fullname);\n  }\n\n  return this.each((value == null\n      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === \"function\"\n      ? (fullname.local ? attrFunctionNS : attrFunction)\n      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/attr.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/call.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/call.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  var callback = arguments[0];\n  arguments[0] = this;\n  callback.apply(null, arguments);\n  return this;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/call.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/classed.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/classed.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction classArray(string) {\n  return string.trim().split(/^|\\s+/);\n}\n\nfunction classList(node) {\n  return node.classList || new ClassList(node);\n}\n\nfunction ClassList(node) {\n  this._node = node;\n  this._names = classArray(node.getAttribute(\"class\") || \"\");\n}\n\nClassList.prototype = {\n  add: function(name) {\n    var i = this._names.indexOf(name);\n    if (i < 0) {\n      this._names.push(name);\n      this._node.setAttribute(\"class\", this._names.join(\" \"));\n    }\n  },\n  remove: function(name) {\n    var i = this._names.indexOf(name);\n    if (i >= 0) {\n      this._names.splice(i, 1);\n      this._node.setAttribute(\"class\", this._names.join(\" \"));\n    }\n  },\n  contains: function(name) {\n    return this._names.indexOf(name) >= 0;\n  }\n};\n\nfunction classedAdd(node, names) {\n  var list = classList(node), i = -1, n = names.length;\n  while (++i < n) list.add(names[i]);\n}\n\nfunction classedRemove(node, names) {\n  var list = classList(node), i = -1, n = names.length;\n  while (++i < n) list.remove(names[i]);\n}\n\nfunction classedTrue(names) {\n  return function() {\n    classedAdd(this, names);\n  };\n}\n\nfunction classedFalse(names) {\n  return function() {\n    classedRemove(this, names);\n  };\n}\n\nfunction classedFunction(names, value) {\n  return function() {\n    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {\n  var names = classArray(name + \"\");\n\n  if (arguments.length < 2) {\n    var list = classList(this.node()), i = -1, n = names.length;\n    while (++i < n) if (!list.contains(names[i])) return false;\n    return true;\n  }\n\n  return this.each((typeof value === \"function\"\n      ? classedFunction : value\n      ? classedTrue\n      : classedFalse)(names, value));\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/classed.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/clone.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/clone.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction selection_cloneShallow() {\n  var clone = this.cloneNode(false), parent = this.parentNode;\n  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;\n}\n\nfunction selection_cloneDeep() {\n  var clone = this.cloneNode(true), parent = this.parentNode;\n  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(deep) {\n  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/clone.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/data.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/data.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _enter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enter.js */ \"./node_modules/d3-selection/src/selection/enter.js\");\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constant.js */ \"./node_modules/d3-selection/src/constant.js\");\n\n\n\n\nfunction bindIndex(parent, group, enter, update, exit, data) {\n  var i = 0,\n      node,\n      groupLength = group.length,\n      dataLength = data.length;\n\n  // Put any non-null nodes that fit into update.\n  // Put any null nodes into enter.\n  // Put any remaining data into enter.\n  for (; i < dataLength; ++i) {\n    if (node = group[i]) {\n      node.__data__ = data[i];\n      update[i] = node;\n    } else {\n      enter[i] = new _enter_js__WEBPACK_IMPORTED_MODULE_0__.EnterNode(parent, data[i]);\n    }\n  }\n\n  // Put any non-null nodes that don’t fit into exit.\n  for (; i < groupLength; ++i) {\n    if (node = group[i]) {\n      exit[i] = node;\n    }\n  }\n}\n\nfunction bindKey(parent, group, enter, update, exit, data, key) {\n  var i,\n      node,\n      nodeByKeyValue = new Map,\n      groupLength = group.length,\n      dataLength = data.length,\n      keyValues = new Array(groupLength),\n      keyValue;\n\n  // Compute the key for each node.\n  // If multiple nodes have the same key, the duplicates are added to exit.\n  for (i = 0; i < groupLength; ++i) {\n    if (node = group[i]) {\n      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + \"\";\n      if (nodeByKeyValue.has(keyValue)) {\n        exit[i] = node;\n      } else {\n        nodeByKeyValue.set(keyValue, node);\n      }\n    }\n  }\n\n  // Compute the key for each datum.\n  // If there a node associated with this key, join and add it to update.\n  // If there is not (or the key is a duplicate), add it to enter.\n  for (i = 0; i < dataLength; ++i) {\n    keyValue = key.call(parent, data[i], i, data) + \"\";\n    if (node = nodeByKeyValue.get(keyValue)) {\n      update[i] = node;\n      node.__data__ = data[i];\n      nodeByKeyValue.delete(keyValue);\n    } else {\n      enter[i] = new _enter_js__WEBPACK_IMPORTED_MODULE_0__.EnterNode(parent, data[i]);\n    }\n  }\n\n  // Add any remaining nodes that were not bound to data to exit.\n  for (i = 0; i < groupLength; ++i) {\n    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {\n      exit[i] = node;\n    }\n  }\n}\n\nfunction datum(node) {\n  return node.__data__;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value, key) {\n  if (!arguments.length) return Array.from(this, datum);\n\n  var bind = key ? bindKey : bindIndex,\n      parents = this._parents,\n      groups = this._groups;\n\n  if (typeof value !== \"function\") value = (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value);\n\n  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {\n    var parent = parents[j],\n        group = groups[j],\n        groupLength = group.length,\n        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),\n        dataLength = data.length,\n        enterGroup = enter[j] = new Array(dataLength),\n        updateGroup = update[j] = new Array(dataLength),\n        exitGroup = exit[j] = new Array(groupLength);\n\n    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);\n\n    // Now connect the enter nodes to their following update node, such that\n    // appendChild can insert the materialized enter node before this node,\n    // rather than at the end of the parent node.\n    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {\n      if (previous = enterGroup[i0]) {\n        if (i0 >= i1) i1 = i0 + 1;\n        while (!(next = updateGroup[i1]) && ++i1 < dataLength);\n        previous._next = next || null;\n      }\n    }\n  }\n\n  update = new _index_js__WEBPACK_IMPORTED_MODULE_2__.Selection(update, parents);\n  update._enter = enter;\n  update._exit = exit;\n  return update;\n}\n\n// Given some data, this returns an array-like view of it: an object that\n// exposes a length property and allows numeric indexing. Note that unlike\n// selectAll, this isn’t worried about “live” collections because the resulting\n// array will only be used briefly while data is being bound. (It is possible to\n// cause the data to change while iterating by using a key function, but please\n// don’t; we’d rather avoid a gratuitous copy.)\nfunction arraylike(data) {\n  return typeof data === \"object\" && \"length\" in data\n    ? data // Array, TypedArray, NodeList, array-like\n    : Array.from(data); // Map, Set, iterable, string, or anything else\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/data.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/datum.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/datum.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  return arguments.length\n      ? this.property(\"__data__\", value)\n      : this.node().__data__;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/datum.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/dispatch.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/dispatch.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../window.js */ \"./node_modules/d3-selection/src/window.js\");\n\n\nfunction dispatchEvent(node, type, params) {\n  var window = (0,_window_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(node),\n      event = window.CustomEvent;\n\n  if (typeof event === \"function\") {\n    event = new event(type, params);\n  } else {\n    event = window.document.createEvent(\"Event\");\n    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;\n    else event.initEvent(type, false, false);\n  }\n\n  node.dispatchEvent(event);\n}\n\nfunction dispatchConstant(type, params) {\n  return function() {\n    return dispatchEvent(this, type, params);\n  };\n}\n\nfunction dispatchFunction(type, params) {\n  return function() {\n    return dispatchEvent(this, type, params.apply(this, arguments));\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(type, params) {\n  return this.each((typeof params === \"function\"\n      ? dispatchFunction\n      : dispatchConstant)(type, params));\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/dispatch.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/each.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/each.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {\n\n  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {\n    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {\n      if (node = group[i]) callback.call(node, node.__data__, i, group);\n    }\n  }\n\n  return this;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/each.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/empty.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/empty.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return !this.node();\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/empty.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/enter.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/enter.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EnterNode\": () => (/* binding */ EnterNode),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sparse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sparse.js */ \"./node_modules/d3-selection/src/selection/sparse.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(this._enter || this._groups.map(_sparse_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]), this._parents);\n}\n\nfunction EnterNode(parent, datum) {\n  this.ownerDocument = parent.ownerDocument;\n  this.namespaceURI = parent.namespaceURI;\n  this._next = null;\n  this._parent = parent;\n  this.__data__ = datum;\n}\n\nEnterNode.prototype = {\n  constructor: EnterNode,\n  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },\n  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },\n  querySelector: function(selector) { return this._parent.querySelector(selector); },\n  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }\n};\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/enter.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/exit.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/exit.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sparse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sparse.js */ \"./node_modules/d3-selection/src/selection/sparse.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(this._exit || this._groups.map(_sparse_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]), this._parents);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/exit.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/filter.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/filter.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ \"./node_modules/d3-selection/src/matcher.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {\n  if (typeof match !== \"function\") match = (0,_matcher_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(match);\n\n  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {\n      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {\n        subgroup.push(node);\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_1__.Selection(subgroups, this._parents);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/filter.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/html.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/html.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction htmlRemove() {\n  this.innerHTML = \"\";\n}\n\nfunction htmlConstant(value) {\n  return function() {\n    this.innerHTML = value;\n  };\n}\n\nfunction htmlFunction(value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    this.innerHTML = v == null ? \"\" : v;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  return arguments.length\n      ? this.each(value == null\n          ? htmlRemove : (typeof value === \"function\"\n          ? htmlFunction\n          : htmlConstant)(value))\n      : this.node().innerHTML;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/html.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Selection\": () => (/* binding */ Selection),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"root\": () => (/* binding */ root)\n/* harmony export */ });\n/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select.js */ \"./node_modules/d3-selection/src/selection/select.js\");\n/* harmony import */ var _selectAll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectAll.js */ \"./node_modules/d3-selection/src/selection/selectAll.js\");\n/* harmony import */ var _selectChild_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectChild.js */ \"./node_modules/d3-selection/src/selection/selectChild.js\");\n/* harmony import */ var _selectChildren_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectChildren.js */ \"./node_modules/d3-selection/src/selection/selectChildren.js\");\n/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter.js */ \"./node_modules/d3-selection/src/selection/filter.js\");\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data.js */ \"./node_modules/d3-selection/src/selection/data.js\");\n/* harmony import */ var _enter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./enter.js */ \"./node_modules/d3-selection/src/selection/enter.js\");\n/* harmony import */ var _exit_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./exit.js */ \"./node_modules/d3-selection/src/selection/exit.js\");\n/* harmony import */ var _join_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./join.js */ \"./node_modules/d3-selection/src/selection/join.js\");\n/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./merge.js */ \"./node_modules/d3-selection/src/selection/merge.js\");\n/* harmony import */ var _order_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./order.js */ \"./node_modules/d3-selection/src/selection/order.js\");\n/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./sort.js */ \"./node_modules/d3-selection/src/selection/sort.js\");\n/* harmony import */ var _call_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./call.js */ \"./node_modules/d3-selection/src/selection/call.js\");\n/* harmony import */ var _nodes_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nodes.js */ \"./node_modules/d3-selection/src/selection/nodes.js\");\n/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node.js */ \"./node_modules/d3-selection/src/selection/node.js\");\n/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./size.js */ \"./node_modules/d3-selection/src/selection/size.js\");\n/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./empty.js */ \"./node_modules/d3-selection/src/selection/empty.js\");\n/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./each.js */ \"./node_modules/d3-selection/src/selection/each.js\");\n/* harmony import */ var _attr_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./attr.js */ \"./node_modules/d3-selection/src/selection/attr.js\");\n/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./style.js */ \"./node_modules/d3-selection/src/selection/style.js\");\n/* harmony import */ var _property_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./property.js */ \"./node_modules/d3-selection/src/selection/property.js\");\n/* harmony import */ var _classed_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./classed.js */ \"./node_modules/d3-selection/src/selection/classed.js\");\n/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./text.js */ \"./node_modules/d3-selection/src/selection/text.js\");\n/* harmony import */ var _html_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./html.js */ \"./node_modules/d3-selection/src/selection/html.js\");\n/* harmony import */ var _raise_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./raise.js */ \"./node_modules/d3-selection/src/selection/raise.js\");\n/* harmony import */ var _lower_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./lower.js */ \"./node_modules/d3-selection/src/selection/lower.js\");\n/* harmony import */ var _append_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./append.js */ \"./node_modules/d3-selection/src/selection/append.js\");\n/* harmony import */ var _insert_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./insert.js */ \"./node_modules/d3-selection/src/selection/insert.js\");\n/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./remove.js */ \"./node_modules/d3-selection/src/selection/remove.js\");\n/* harmony import */ var _clone_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./clone.js */ \"./node_modules/d3-selection/src/selection/clone.js\");\n/* harmony import */ var _datum_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./datum.js */ \"./node_modules/d3-selection/src/selection/datum.js\");\n/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./on.js */ \"./node_modules/d3-selection/src/selection/on.js\");\n/* harmony import */ var _dispatch_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./dispatch.js */ \"./node_modules/d3-selection/src/selection/dispatch.js\");\n/* harmony import */ var _iterator_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./iterator.js */ \"./node_modules/d3-selection/src/selection/iterator.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar root = [null];\n\nfunction Selection(groups, parents) {\n  this._groups = groups;\n  this._parents = parents;\n}\n\nfunction selection() {\n  return new Selection([[document.documentElement]], root);\n}\n\nfunction selection_selection() {\n  return this;\n}\n\nSelection.prototype = selection.prototype = {\n  constructor: Selection,\n  select: _select_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  selectAll: _selectAll_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  selectChild: _selectChild_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  selectChildren: _selectChildren_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  filter: _filter_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  data: _data_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  enter: _enter_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  exit: _exit_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  join: _join_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  merge: _merge_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  selection: selection_selection,\n  order: _order_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n  sort: _sort_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n  call: _call_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"],\n  nodes: _nodes_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"],\n  node: _node_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"],\n  size: _size_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"],\n  empty: _empty_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"],\n  each: _each_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"],\n  attr: _attr_js__WEBPACK_IMPORTED_MODULE_18__[\"default\"],\n  style: _style_js__WEBPACK_IMPORTED_MODULE_19__[\"default\"],\n  property: _property_js__WEBPACK_IMPORTED_MODULE_20__[\"default\"],\n  classed: _classed_js__WEBPACK_IMPORTED_MODULE_21__[\"default\"],\n  text: _text_js__WEBPACK_IMPORTED_MODULE_22__[\"default\"],\n  html: _html_js__WEBPACK_IMPORTED_MODULE_23__[\"default\"],\n  raise: _raise_js__WEBPACK_IMPORTED_MODULE_24__[\"default\"],\n  lower: _lower_js__WEBPACK_IMPORTED_MODULE_25__[\"default\"],\n  append: _append_js__WEBPACK_IMPORTED_MODULE_26__[\"default\"],\n  insert: _insert_js__WEBPACK_IMPORTED_MODULE_27__[\"default\"],\n  remove: _remove_js__WEBPACK_IMPORTED_MODULE_28__[\"default\"],\n  clone: _clone_js__WEBPACK_IMPORTED_MODULE_29__[\"default\"],\n  datum: _datum_js__WEBPACK_IMPORTED_MODULE_30__[\"default\"],\n  on: _on_js__WEBPACK_IMPORTED_MODULE_31__[\"default\"],\n  dispatch: _dispatch_js__WEBPACK_IMPORTED_MODULE_32__[\"default\"],\n  [Symbol.iterator]: _iterator_js__WEBPACK_IMPORTED_MODULE_33__[\"default\"]\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selection);\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/index.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/insert.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/insert.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creator.js */ \"./node_modules/d3-selection/src/creator.js\");\n/* harmony import */ var _selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selector.js */ \"./node_modules/d3-selection/src/selector.js\");\n\n\n\nfunction constantNull() {\n  return null;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, before) {\n  var create = typeof name === \"function\" ? name : (0,_creator_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name),\n      select = before == null ? constantNull : typeof before === \"function\" ? before : (0,_selector_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(before);\n  return this.select(function() {\n    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);\n  });\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/insert.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/iterator.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function* __WEBPACK_DEFAULT_EXPORT__() {\n  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {\n    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {\n      if (node = group[i]) yield node;\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/iterator.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/join.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/join.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(onenter, onupdate, onexit) {\n  var enter = this.enter(), update = this, exit = this.exit();\n  if (typeof onenter === \"function\") {\n    enter = onenter(enter);\n    if (enter) enter = enter.selection();\n  } else {\n    enter = enter.append(onenter + \"\");\n  }\n  if (onupdate != null) {\n    update = onupdate(update);\n    if (update) update = update.selection();\n  }\n  if (onexit == null) exit.remove(); else onexit(exit);\n  return enter && update ? enter.merge(update).order() : update;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/join.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/lower.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/lower.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction lower() {\n  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return this.each(lower);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/lower.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/merge.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/merge.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {\n  var selection = context.selection ? context.selection() : context;\n\n  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {\n    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {\n      if (node = group0[i] || group1[i]) {\n        merge[i] = node;\n      }\n    }\n  }\n\n  for (; j < m0; ++j) {\n    merges[j] = groups0[j];\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(merges, this._parents);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/merge.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/node.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/node.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n\n  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {\n    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {\n      var node = group[i];\n      if (node) return node;\n    }\n  }\n\n  return null;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/node.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/nodes.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/nodes.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return Array.from(this);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/nodes.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/on.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/on.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction contextListener(listener) {\n  return function(event) {\n    listener.call(this, event, this.__data__);\n  };\n}\n\nfunction parseTypenames(typenames) {\n  return typenames.trim().split(/^|\\s+/).map(function(t) {\n    var name = \"\", i = t.indexOf(\".\");\n    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);\n    return {type: t, name: name};\n  });\n}\n\nfunction onRemove(typename) {\n  return function() {\n    var on = this.__on;\n    if (!on) return;\n    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {\n      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {\n        this.removeEventListener(o.type, o.listener, o.options);\n      } else {\n        on[++i] = o;\n      }\n    }\n    if (++i) on.length = i;\n    else delete this.__on;\n  };\n}\n\nfunction onAdd(typename, value, options) {\n  return function() {\n    var on = this.__on, o, listener = contextListener(value);\n    if (on) for (var j = 0, m = on.length; j < m; ++j) {\n      if ((o = on[j]).type === typename.type && o.name === typename.name) {\n        this.removeEventListener(o.type, o.listener, o.options);\n        this.addEventListener(o.type, o.listener = listener, o.options = options);\n        o.value = value;\n        return;\n      }\n    }\n    this.addEventListener(typename.type, listener, options);\n    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};\n    if (!on) this.__on = [o];\n    else on.push(o);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(typename, value, options) {\n  var typenames = parseTypenames(typename + \"\"), i, n = typenames.length, t;\n\n  if (arguments.length < 2) {\n    var on = this.node().__on;\n    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {\n      for (i = 0, o = on[j]; i < n; ++i) {\n        if ((t = typenames[i]).type === o.type && t.name === o.name) {\n          return o.value;\n        }\n      }\n    }\n    return;\n  }\n\n  on = value ? onAdd : onRemove;\n  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));\n  return this;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/on.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/order.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/order.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n\n  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {\n    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {\n      if (node = group[i]) {\n        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);\n        next = node;\n      }\n    }\n  }\n\n  return this;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/order.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/property.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/property.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction propertyRemove(name) {\n  return function() {\n    delete this[name];\n  };\n}\n\nfunction propertyConstant(name, value) {\n  return function() {\n    this[name] = value;\n  };\n}\n\nfunction propertyFunction(name, value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (v == null) delete this[name];\n    else this[name] = v;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {\n  return arguments.length > 1\n      ? this.each((value == null\n          ? propertyRemove : typeof value === \"function\"\n          ? propertyFunction\n          : propertyConstant)(name, value))\n      : this.node()[name];\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/property.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/raise.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/raise.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction raise() {\n  if (this.nextSibling) this.parentNode.appendChild(this);\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return this.each(raise);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/raise.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/remove.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/remove.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction remove() {\n  var parent = this.parentNode;\n  if (parent) parent.removeChild(this);\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return this.each(remove);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/remove.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/select.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/select.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _selector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selector.js */ \"./node_modules/d3-selection/src/selector.js\");\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {\n  if (typeof select !== \"function\") select = (0,_selector_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(select);\n\n  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {\n      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {\n        if (\"__data__\" in node) subnode.__data__ = node.__data__;\n        subgroup[i] = subnode;\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_1__.Selection(subgroups, this._parents);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/select.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/selectAll.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/selectAll.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../array.js */ \"./node_modules/d3-selection/src/array.js\");\n/* harmony import */ var _selectorAll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selectorAll.js */ \"./node_modules/d3-selection/src/selectorAll.js\");\n\n\n\n\nfunction arrayAll(select) {\n  return function() {\n    return (0,_array_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(select.apply(this, arguments));\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {\n  if (typeof select === \"function\") select = arrayAll(select);\n  else select = (0,_selectorAll_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(select);\n\n  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {\n      if (node = group[i]) {\n        subgroups.push(select.call(node, node.__data__, i, group));\n        parents.push(node);\n      }\n    }\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_2__.Selection(subgroups, parents);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/selectAll.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/selectChild.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/selectChild.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ \"./node_modules/d3-selection/src/matcher.js\");\n\n\nvar find = Array.prototype.find;\n\nfunction childFind(match) {\n  return function() {\n    return find.call(this.children, match);\n  };\n}\n\nfunction childFirst() {\n  return this.firstElementChild;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {\n  return this.select(match == null ? childFirst\n      : childFind(typeof match === \"function\" ? match : (0,_matcher_js__WEBPACK_IMPORTED_MODULE_0__.childMatcher)(match)));\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/selectChild.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/selectChildren.js":
/*!*******************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/selectChildren.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ \"./node_modules/d3-selection/src/matcher.js\");\n\n\nvar filter = Array.prototype.filter;\n\nfunction children() {\n  return Array.from(this.children);\n}\n\nfunction childrenFilter(match) {\n  return function() {\n    return filter.call(this.children, match);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {\n  return this.selectAll(match == null ? children\n      : childrenFilter(typeof match === \"function\" ? match : (0,_matcher_js__WEBPACK_IMPORTED_MODULE_0__.childMatcher)(match)));\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/selectChildren.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/size.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/size.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  let size = 0;\n  for (const node of this) ++size; // eslint-disable-line no-unused-vars\n  return size;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/size.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/sort.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/sort.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./node_modules/d3-selection/src/selection/index.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(compare) {\n  if (!compare) compare = ascending;\n\n  function compareNode(a, b) {\n    return a && b ? compare(a.__data__, b.__data__) : !a - !b;\n  }\n\n  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {\n    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {\n      if (node = group[i]) {\n        sortgroup[i] = node;\n      }\n    }\n    sortgroup.sort(compareNode);\n  }\n\n  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(sortgroups, this._parents).order();\n}\n\nfunction ascending(a, b) {\n  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/sort.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/sparse.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/sparse.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(update) {\n  return new Array(update.length);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/sparse.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/style.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/style.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"styleValue\": () => (/* binding */ styleValue)\n/* harmony export */ });\n/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../window.js */ \"./node_modules/d3-selection/src/window.js\");\n\n\nfunction styleRemove(name) {\n  return function() {\n    this.style.removeProperty(name);\n  };\n}\n\nfunction styleConstant(name, value, priority) {\n  return function() {\n    this.style.setProperty(name, value, priority);\n  };\n}\n\nfunction styleFunction(name, value, priority) {\n  return function() {\n    var v = value.apply(this, arguments);\n    if (v == null) this.style.removeProperty(name);\n    else this.style.setProperty(name, v, priority);\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value, priority) {\n  return arguments.length > 1\n      ? this.each((value == null\n            ? styleRemove : typeof value === \"function\"\n            ? styleFunction\n            : styleConstant)(name, value, priority == null ? \"\" : priority))\n      : styleValue(this.node(), name);\n}\n\nfunction styleValue(node, name) {\n  return node.style.getPropertyValue(name)\n      || (0,_window_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(node).getComputedStyle(node, null).getPropertyValue(name);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/style.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selection/text.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/text.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction textRemove() {\n  this.textContent = \"\";\n}\n\nfunction textConstant(value) {\n  return function() {\n    this.textContent = value;\n  };\n}\n\nfunction textFunction(value) {\n  return function() {\n    var v = value.apply(this, arguments);\n    this.textContent = v == null ? \"\" : v;\n  };\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {\n  return arguments.length\n      ? this.each(value == null\n          ? textRemove : (typeof value === \"function\"\n          ? textFunction\n          : textConstant)(value))\n      : this.node().textContent;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selection/text.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selector.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-selection/src/selector.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction none() {}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {\n  return selector == null ? none : function() {\n    return this.querySelector(selector);\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selector.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/selectorAll.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-selection/src/selectorAll.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction empty() {\n  return [];\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {\n  return selector == null ? empty : function() {\n    return this.querySelectorAll(selector);\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/selectorAll.js?");

/***/ }),

/***/ "./node_modules/d3-selection/src/window.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-selection/src/window.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node) {\n  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node\n      || (node.document && node) // node is a Window\n      || node.defaultView; // node is a Document\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-selection/src/window.js?");

/***/ }),

/***/ "./node_modules/d3-shape/src/array.js":
/*!********************************************!*\
  !*** ./node_modules/d3-shape/src/array.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"slice\": () => (/* binding */ slice)\n/* harmony export */ });\nvar slice = Array.prototype.slice;\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {\n  return typeof x === \"object\" && \"length\" in x\n    ? x // Array, TypedArray, NodeList, array-like\n    : Array.from(x); // Map, Set, iterable, string, or anything else\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-shape/src/array.js?");

/***/ }),

/***/ "./node_modules/d3-shape/src/constant.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-shape/src/constant.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {\n  return function constant() {\n    return x;\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-shape/src/constant.js?");

/***/ }),

/***/ "./node_modules/d3-shape/src/curve/bump.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-shape/src/curve/bump.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"bumpRadial\": () => (/* binding */ bumpRadial),\n/* harmony export */   \"bumpX\": () => (/* binding */ bumpX),\n/* harmony export */   \"bumpY\": () => (/* binding */ bumpY)\n/* harmony export */ });\n/* harmony import */ var _pointRadial_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pointRadial.js */ \"./node_modules/d3-shape/src/pointRadial.js\");\n\n\nclass Bump {\n  constructor(context, x) {\n    this._context = context;\n    this._x = x;\n  }\n  areaStart() {\n    this._line = 0;\n  }\n  areaEnd() {\n    this._line = NaN;\n  }\n  lineStart() {\n    this._point = 0;\n  }\n  lineEnd() {\n    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();\n    this._line = 1 - this._line;\n  }\n  point(x, y) {\n    x = +x, y = +y;\n    switch (this._point) {\n      case 0: {\n        this._point = 1;\n        if (this._line) this._context.lineTo(x, y);\n        else this._context.moveTo(x, y);\n        break;\n      }\n      case 1: this._point = 2; // falls through\n      default: {\n        if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x) / 2, this._y0, this._x0, y, x, y);\n        else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y) / 2, x, this._y0, x, y);\n        break;\n      }\n    }\n    this._x0 = x, this._y0 = y;\n  }\n}\n\nclass BumpRadial {\n  constructor(context) {\n    this._context = context;\n  }\n  lineStart() {\n    this._point = 0;\n  }\n  lineEnd() {}\n  point(x, y) {\n    x = +x, y = +y;\n    if (this._point === 0) {\n      this._point = 1;\n    } else {\n      const p0 = (0,_pointRadial_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this._x0, this._y0);\n      const p1 = (0,_pointRadial_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this._x0, this._y0 = (this._y0 + y) / 2);\n      const p2 = (0,_pointRadial_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(x, this._y0);\n      const p3 = (0,_pointRadial_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(x, y);\n      this._context.moveTo(...p0);\n      this._context.bezierCurveTo(...p1, ...p2, ...p3);\n    }\n    this._x0 = x, this._y0 = y;\n  }\n}\n\nfunction bumpX(context) {\n  return new Bump(context, true);\n}\n\nfunction bumpY(context) {\n  return new Bump(context, false);\n}\n\nfunction bumpRadial(context) {\n  return new BumpRadial(context);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-shape/src/curve/bump.js?");

/***/ }),

/***/ "./node_modules/d3-shape/src/curve/step.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-shape/src/curve/step.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"stepAfter\": () => (/* binding */ stepAfter),\n/* harmony export */   \"stepBefore\": () => (/* binding */ stepBefore)\n/* harmony export */ });\nfunction Step(context, t) {\n  this._context = context;\n  this._t = t;\n}\n\nStep.prototype = {\n  areaStart: function() {\n    this._line = 0;\n  },\n  areaEnd: function() {\n    this._line = NaN;\n  },\n  lineStart: function() {\n    this._x = this._y = NaN;\n    this._point = 0;\n  },\n  lineEnd: function() {\n    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);\n    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();\n    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;\n  },\n  point: function(x, y) {\n    x = +x, y = +y;\n    switch (this._point) {\n      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;\n      case 1: this._point = 2; // falls through\n      default: {\n        if (this._t <= 0) {\n          this._context.lineTo(this._x, y);\n          this._context.lineTo(x, y);\n        } else {\n          var x1 = this._x * (1 - this._t) + x * this._t;\n          this._context.lineTo(x1, this._y);\n          this._context.lineTo(x1, y);\n        }\n        break;\n      }\n    }\n    this._x = x, this._y = y;\n  }\n};\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {\n  return new Step(context, 0.5);\n}\n\nfunction stepBefore(context) {\n  return new Step(context, 0);\n}\n\nfunction stepAfter(context) {\n  return new Step(context, 1);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-shape/src/curve/step.js?");

/***/ }),

/***/ "./node_modules/d3-shape/src/link.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-shape/src/link.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"link\": () => (/* binding */ link),\n/* harmony export */   \"linkHorizontal\": () => (/* binding */ linkHorizontal),\n/* harmony export */   \"linkRadial\": () => (/* binding */ linkRadial),\n/* harmony export */   \"linkVertical\": () => (/* binding */ linkVertical)\n/* harmony export */ });\n/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array.js */ \"./node_modules/d3-shape/src/array.js\");\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constant.js */ \"./node_modules/d3-shape/src/constant.js\");\n/* harmony import */ var _curve_bump_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./curve/bump.js */ \"./node_modules/d3-shape/src/curve/bump.js\");\n/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.js */ \"./node_modules/d3-shape/src/path.js\");\n/* harmony import */ var _point_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point.js */ \"./node_modules/d3-shape/src/point.js\");\n\n\n\n\n\n\nfunction linkSource(d) {\n  return d.source;\n}\n\nfunction linkTarget(d) {\n  return d.target;\n}\n\nfunction link(curve) {\n  let source = linkSource,\n      target = linkTarget,\n      x = _point_js__WEBPACK_IMPORTED_MODULE_0__.x,\n      y = _point_js__WEBPACK_IMPORTED_MODULE_0__.y,\n      context = null,\n      output = null,\n      path = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.withPath)(link);\n\n  function link() {\n    let buffer;\n    const argv = _array_js__WEBPACK_IMPORTED_MODULE_2__.slice.call(arguments);\n    const s = source.apply(this, argv);\n    const t = target.apply(this, argv);\n    if (context == null) output = curve(buffer = path());\n    output.lineStart();\n    argv[0] = s, output.point(+x.apply(this, argv), +y.apply(this, argv));\n    argv[0] = t, output.point(+x.apply(this, argv), +y.apply(this, argv));\n    output.lineEnd();\n    if (buffer) return output = null, buffer + \"\" || null;\n  }\n\n  link.source = function(_) {\n    return arguments.length ? (source = _, link) : source;\n  };\n\n  link.target = function(_) {\n    return arguments.length ? (target = _, link) : target;\n  };\n\n  link.x = function(_) {\n    return arguments.length ? (x = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(+_), link) : x;\n  };\n\n  link.y = function(_) {\n    return arguments.length ? (y = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(+_), link) : y;\n  };\n\n  link.context = function(_) {\n    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), link) : context;\n  };\n\n  return link;\n}\n\nfunction linkHorizontal() {\n  return link(_curve_bump_js__WEBPACK_IMPORTED_MODULE_4__.bumpX);\n}\n\nfunction linkVertical() {\n  return link(_curve_bump_js__WEBPACK_IMPORTED_MODULE_4__.bumpY);\n}\n\nfunction linkRadial() {\n  const l = link(_curve_bump_js__WEBPACK_IMPORTED_MODULE_4__.bumpRadial);\n  l.angle = l.x, delete l.x;\n  l.radius = l.y, delete l.y;\n  return l;\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-shape/src/link.js?");

/***/ }),

/***/ "./node_modules/d3-shape/src/path.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-shape/src/path.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"withPath\": () => (/* binding */ withPath)\n/* harmony export */ });\n/* harmony import */ var d3_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-path */ \"./node_modules/d3-path/src/path.js\");\n\n\nfunction withPath(shape) {\n  let digits = 3;\n\n  shape.digits = function(_) {\n    if (!arguments.length) return digits;\n    if (_ == null) {\n      digits = null;\n    } else {\n      const d = Math.floor(_);\n      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);\n      digits = d;\n    }\n    return shape;\n  };\n\n  return () => new d3_path__WEBPACK_IMPORTED_MODULE_0__.Path(digits);\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-shape/src/path.js?");

/***/ }),

/***/ "./node_modules/d3-shape/src/point.js":
/*!********************************************!*\
  !*** ./node_modules/d3-shape/src/point.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"x\": () => (/* binding */ x),\n/* harmony export */   \"y\": () => (/* binding */ y)\n/* harmony export */ });\nfunction x(p) {\n  return p[0];\n}\n\nfunction y(p) {\n  return p[1];\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-shape/src/point.js?");

/***/ }),

/***/ "./node_modules/d3-shape/src/pointRadial.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-shape/src/pointRadial.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, y) {\n  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];\n}\n\n\n//# sourceURL=webpack:///./node_modules/d3-shape/src/pointRadial.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;