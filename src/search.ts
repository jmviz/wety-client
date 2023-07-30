import { API_BASE_URL } from "./api";
import { Item } from "./item";
import { getHeadProgenitorTree } from "./tree";

////////////////////////
// Base Search Class
////////////////////////

class Input {
    element: HTMLInputElement;

    constructor(elementId: string) {
        this.element = document.getElementById(elementId) as HTMLInputElement;
    }

    getQueryValue(): string {
        return encodeURIComponent(this.element.value.trim().toLowerCase());
    }
}

interface Suggestion {
    getId(): number;
    createListElement(): HTMLLIElement;
    inputValue(): string;
}

class SuggestionsList {
    data: Suggestion[];
    element: HTMLUListElement;
    elementHovered: boolean;
    items: HTMLLIElement[];
    activeItemIndex: number | null;

    constructor(elementId: string) {
        this.data = [];
        this.element = document.getElementById(elementId) as HTMLUListElement;
        this.elementHovered = false;
        this.items = [];
        this.activeItemIndex = null;

        this.element.addEventListener("pointerover", () => {
            this.elementHovered = true;
        });
        this.element.addEventListener("pointerout", () => {
            this.elementHovered = false;
        });
    }

    addItem(li: HTMLLIElement) {
        this.element.appendChild(li);
        this.items.push(li);
    }

    hide() {
        this.element.classList.add("hidden");
    }

    show() {
        this.element.classList.remove("hidden");
    }

    clear() {
        this.element.innerHTML = "";
        this.hide();
        this.items = [];
        this.activeItemIndex = null;
    }

    updateActiveItem(newIndex: number | null) {
        const oldActive =
            this.activeItemIndex !== null
                ? this.items[this.activeItemIndex]
                : null;
        oldActive?.classList.remove("highlighted");
        this.activeItemIndex = newIndex;
        const newActive =
            this.activeItemIndex !== null
                ? this.items[this.activeItemIndex]
                : null;
        newActive?.classList.add("highlighted");
    }

    adjustScroll() {
        const active =
            this.activeItemIndex !== null
                ? this.items[this.activeItemIndex]
                : null;
        if (active === null) return;

        const activeRect = active.getBoundingClientRect();
        const listRect = this.element.getBoundingClientRect();
        if (activeRect.bottom > listRect.bottom) {
            this.element.scrollTop += activeRect.bottom - listRect.bottom;
        } else if (activeRect.top < listRect.top) {
            this.element.scrollTop -= listRect.top - activeRect.top;
        }
    }
}

interface ApiEndpoint {
    timeout: number | undefined;
    timeoutDuration: number;
    fetch(query: string): Promise<Suggestion[]>;
}

class Search {
    input: Input;
    nextFocus: HTMLElement | null;
    suggestionsList: SuggestionsList;
    apiEndpoint: ApiEndpoint;
    selectedId: number | null = null;

    constructor(config: {
        input: Input;
        suggestionsList: SuggestionsList;
        apiEndpoint: ApiEndpoint;
        nextFocus: HTMLElement | null;
    }) {
        this.input = config.input;
        this.suggestionsList = config.suggestionsList;
        this.apiEndpoint = config.apiEndpoint;
        this.nextFocus = config.nextFocus;

        this.input.element.addEventListener("input", () => this.handleInput());
        this.input.element.addEventListener("keydown", (event) =>
            this.handleKeydown(event),
        );
        this.input.element.addEventListener("blur", () => this.handleBlur());
    }

    handleInput() {
        this.selectedId = null;
        window.clearTimeout(this.apiEndpoint.timeout);
        this.apiEndpoint.timeout = window.setTimeout(
            () => this.fetchSuggestions(),
            this.apiEndpoint.timeoutDuration,
        );
    }

    handleKeydown(event: KeyboardEvent) {
        if (this.suggestionsList.data.length === 0) return;

        const lastIndex = this.suggestionsList.data.length - 1;
        const activeIndex = this.suggestionsList.activeItemIndex;
        let newActiveIndex: number | null = null;

        switch (event.key) {
            case "Escape":
                this.suggestionsList.hide();
                break;
            case "ArrowDown":
                event.preventDefault();
                if (activeIndex === null || activeIndex >= lastIndex) {
                    newActiveIndex = 0;
                } else {
                    newActiveIndex = activeIndex + 1;
                }
                break;
            case "ArrowUp":
                event.preventDefault();
                if (activeIndex === null || activeIndex <= 0) {
                    newActiveIndex = lastIndex;
                } else {
                    newActiveIndex = activeIndex - 1;
                }
                break;
            case "Enter":
                if (
                    activeIndex !== null &&
                    this.suggestionsList.data[activeIndex]
                ) {
                    this.setSelected(this.suggestionsList.data[activeIndex]);
                }
                break;
        }

        this.suggestionsList.updateActiveItem(newActiveIndex);
        this.suggestionsList.adjustScroll();
    }

    handleBlur() {
        // Prevent the suggestions list from being hidden when user presses
        // "Done" on virtual keyboard, thereby unfocusing the input element.
        const hasTouch = "ontouchstart" in window;
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
        const hasTouchOnly = hasTouch && !hasFinePointer;

        if (
            (hasTouchOnly || this.suggestionsList.elementHovered) &&
            this.selectedId === null
        ) {
            return;
        }
        this.suggestionsList.hide();
    }

    async fetchSuggestions() {
        const query = this.input.getQueryValue();
        if (!query) {
            this.suggestionsList.clear();
            return;
        }
        try {
            const data = await this.apiEndpoint.fetch(query);
            this.suggestionsList.data = data;
            this.displaySuggestions();
        } catch (error) {
            console.error(error);
        }
    }

    displaySuggestions() {
        this.suggestionsList.clear();
        if (this.suggestionsList.data.length === 0) return;
        for (let i = 0; i < this.suggestionsList.data.length; i++) {
            const suggestion = this.suggestionsList.data[i];
            const li = suggestion.createListElement();
            li.classList.add("search-suggestion-item");
            li.addEventListener("pointerup", () => {
                this.setSelected(suggestion);
            });
            li.addEventListener("pointerover", () => {
                this.suggestionsList.updateActiveItem(i);
            });
            this.suggestionsList.addItem(li);
        }
        this.suggestionsList.show();
    }

    setSelected(suggestion: Suggestion) {
        this.input.element.value = suggestion.inputValue();
        this.selectedId = suggestion.getId();
        this.suggestionsList.hide();
        this.nextFocus?.focus();
    }
}

////////////////////////
// Language Search
////////////////////////

interface LangSuggestionData {
    code: string;
    id: number;
    items: number;
    name: string;
    similarity: number;
}

class LangSuggestion implements Suggestion {
    code: string;
    id: number;
    items: number;
    name: string;
    similarity: number;

    constructor(data: LangSuggestionData) {
        this.code = data.code;
        this.id = data.id;
        this.items = data.items;
        this.name = data.name;
        this.similarity = data.similarity;
    }

    getId(): number {
        return this.id;
    }

    createListElement(): HTMLLIElement {
        const el = document.createElement("li");
        el.textContent = this.name;
        return el;
    }

    inputValue(): string {
        return this.name;
    }
}

class LangSearchApiEndpoint implements ApiEndpoint {
    timeout: number | undefined = undefined;
    timeoutDuration = 500;
    async fetch(query: string): Promise<LangSuggestion[]> {
        const response = await fetch(`${API_BASE_URL}langs/${query}`);
        console.log(response);
        const data = (await response.json()) as LangSuggestionData[];
        console.log(data);
        return data.map((d) => new LangSuggestion(d));
    }
}

class LangSearch extends Search {
    lastLangName: string | null = null;
    lastLangId: number | null = null;

    constructor() {
        const input = new Input("lang-search-input");
        const suggestionsList = new SuggestionsList("lang-search-suggestions");
        const apiEndpoint = new LangSearchApiEndpoint();
        const nextFocus = document.getElementById("item-search-input");
        const config = { input, suggestionsList, apiEndpoint, nextFocus };
        super(config);
        this.getStoredLastLang();
    }

    async getStoredLastLang() {
        const lastLangName = window.localStorage.getItem("lastLangName");
        const lastLangId = parseInt(
            window.localStorage.getItem("lastLangId") || "",
        );
        if (lastLangName === null || isNaN(lastLangId)) {
            this.input.element.focus();
            return;
        }

        try {
            console.log(
                `Checking that stored last term language with name ${lastLangName} and id ${lastLangId} is still valid...`,
            );
            const data = await this.apiEndpoint.fetch(lastLangName);
            console.log(data);
            const lang = data[0];
            if (
                lang.inputValue() === lastLangName &&
                lang.getId() === lastLangId
            ) {
                console.log("Check succeeded, using stored last lang.");
                this.setSelected(lang);
                this.nextFocus?.focus();
                return;
            }
            throw new Error("invalid stored last lang");
        } catch (error) {
            this.input.element.value = "";
            this.input.element.focus();
            console.log(
                "Check failed, clearing stored last lang. Probably the data was updated since your last visit.",
            );
            this.lastLangName = null;
            this.lastLangId = null;
            window.localStorage.removeItem("lastLangName");
            window.localStorage.removeItem("lastLangId");
            return;
        }
    }

    setSelected(suggestion: Suggestion) {
        window.localStorage.setItem("lastLangName", suggestion.inputValue());
        window.localStorage.setItem(
            "lastLangId",
            suggestion.getId().toString(),
        );
        super.setSelected(suggestion);
    }
}

export const LANG_SEARCH = new LangSearch();

////////////////////////
// Item Search
////////////////////////

interface ItemSuggestionData {
    distance: number;
    item: Item;
}

class ItemSuggestion implements Suggestion {
    distance: number;
    item: Item;

    constructor(data: ItemSuggestionData) {
        this.distance = data.distance;
        this.item = data.item;
    }

    getId(): number {
        return this.item.id;
    }

    createListElement(): HTMLLIElement {
        const el = document.createElement("li");
        const termLine = document.createElement("div");
        termLine.classList.add("term-line");
        termLine.innerHTML = this.item.term;
        el.appendChild(termLine);
        const posList = this.item.pos ?? [];
        const glossList = this.item.gloss ?? [];
        for (let i = 0; i < posList.length; i++) {
            const pos = posList[i];
            const gloss = glossList[i];
            const posLine = document.createElement("div");
            posLine.classList.add("pos-line");
            posLine.innerHTML = `<span class="pos">${pos}</span>: <span class="gloss">${gloss}</span>`;
            el.appendChild(posLine);
        }
        return el;
    }

    inputValue(): string {
        return this.item.term;
    }
}

class ItemSearchApiEndpoint implements ApiEndpoint {
    timeout: number | undefined = undefined;
    timeoutDuration = 500;
    async fetch(query: string): Promise<ItemSuggestion[]> {
        const lang = LANG_SEARCH.selectedId;
        if (lang === null) {
            console.log("No term language selected, not fetching items.");
            return [];
        }
        const response = await fetch(`${API_BASE_URL}items/${lang}/${query}`);
        console.log(response);
        const data = (await response.json()) as ItemSuggestionData[];
        console.log(data);
        return data.map((d) => new ItemSuggestion(d));
    }
}

class ItemSearch extends Search {
    treeFetchTimeout: number | undefined = undefined;
    treeFetchTimeoutDuration = 0;

    constructor() {
        const input = new Input("item-search-input");
        const suggestionsList = new SuggestionsList("item-search-suggestions");
        const apiEndpoint = new ItemSearchApiEndpoint();
        const nextFocus = null;
        const config = { input, suggestionsList, apiEndpoint, nextFocus };
        super(config);
    }

    setSelected(suggestion: Suggestion) {
        super.setSelected(suggestion);
        const lang = LANG_SEARCH.selectedId;
        if (lang === null) {
            console.log("No term language selected, not fetching tree.");
            return;
        }
        window.clearTimeout(this.treeFetchTimeout);
        this.treeFetchTimeout = window.setTimeout(
            getHeadProgenitorTree,
            this.treeFetchTimeoutDuration,
        );
    }
}

export const ITEM_SEARCH = new ItemSearch();
