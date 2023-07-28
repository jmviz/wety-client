import { LangMatch, LangMatches, Item, ItemMatch, ItemMatches } from "./types";
import { getHeadProgenitorTree } from "./tree";

const hasTouch = "ontouchstart" in window;
// a mouse, trackpad, stylus, etc.
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
// this is an attempt to deal with mobile devices that will throw up a virtual
// keyboard for text input that we have to deal with
const hasTouchOnly = hasTouch && !hasFinePointer;

const langSearchInput = document.getElementById(
    "lang-input",
) as HTMLInputElement;
const langSuggestionsList = document.getElementById(
    "lang-suggestions",
) as HTMLUListElement;
let langSuggestions: LangMatch[] = [];
let langSelectedSuggestionIndex = -1;
let langSuggestionsListHovered = false;
export let langSelectedId = -1;
let langFetchTimeout: number;

function getAPIAddress() {
    switch (window.location.hostname) {
        case "www.wety.org":
        case "wety.org":
            return "https://api.wety.org/";
        default:
            // to test only on the machine running this client server, uncomment
            // this line and comment the line below it:
            // return "http://127.0.0.1:3000/";

            // to test on other devices on your network, comment the above line
            // and replace the below line with the local IP address for the
            // machine running this client server, e.g.:
            return "http://192.168.0.88:3000/";
    }
}

export const api = getAPIAddress();

let lastLangName: string | null = null;
let lastLangId: number | null = null;

function setSelectedLang(match: LangMatch) {
    langSelectedId = match.id;
    window.localStorage.setItem("lastLangName", match.name);
    window.localStorage.setItem("lastLangId", match.id.toString());
}

window.addEventListener("DOMContentLoaded", async function () {
    lastLangName = this.localStorage.getItem("lastLangName");
    lastLangId = parseInt(this.localStorage.getItem("lastLangId") || "");
    if (lastLangName !== null && lastLangId !== null) {
        langSearchInput.value = lastLangName;
        try {
            console.log(
                `Checking that stored last lang with name ${lastLangName} and id ${lastLangId} is still valid...`,
            );
            const urlLangName = encodeURIComponent(lastLangName);
            const response = await fetch(`${api}langs/${urlLangName}`);
            const data = (await response.json()) as LangMatches;
            console.log(data);
            const langMatch = data.matches[0];
            if (
                langMatch.name === lastLangName &&
                langMatch.id === lastLangId
            ) {
                console.log("Check succeeded, using stored last lang.");
                setSelectedLang(langMatch);
                termSearchInput.focus();
                return;
            }
            throw new Error("invalid stored last lang");
        } catch (error) {
            langSearchInput.value = "";
            langSearchInput.focus();
            console.log(
                "Check failed, clearing stored last lang. Probably the data was updated since your last visit.",
            );
            lastLangName = null;
            lastLangId = null;
            this.localStorage.removeItem("lastLangName");
            this.localStorage.removeItem("lastLangId");
            return;
        }
    }
    langSearchInput.focus();
});

function displayLangSuggestions() {
    langSuggestionsList.innerHTML = "";
    langSelectedSuggestionIndex = -1;
    if (langSuggestions.length === 0) {
        langSuggestionsList.classList.add("hidden");
        return;
    }
    for (let i = 0; i < langSuggestions.length; i++) {
        const suggestion = langSuggestions[i];
        const li = document.createElement("li");
        li.classList.add("suggestion-item");
        li.textContent = suggestion.name;
        li.addEventListener("pointerup", () => {
            langSearchInput.value = suggestion.name;
            setSelectedLang(suggestion);
            langSuggestionsList.classList.add("hidden");
            termSearchInput.focus();
        });
        li.addEventListener("pointerover", function () {
            updateSelectedLangSuggestion("hover", i);
        });
        langSuggestionsList.appendChild(li);
    }
    langSuggestionsList.classList.remove("hidden");
}

async function fetchLangSuggestions() {
    const input = encodeURIComponent(
        langSearchInput.value.trim().toLowerCase(),
    );
    if (!input) {
        langSuggestionsList.innerHTML = "";
        return;
    }
    try {
        const response = await fetch(`${api}langs/${input}`);
        const data = (await response.json()) as LangMatches;
        console.log(data);
        langSuggestions = data.matches;
        displayLangSuggestions();
    } catch (error) {
        console.error(error);
    }
}

langSearchInput.addEventListener("input", () => {
    langSelectedId = -1;
    window.clearTimeout(langFetchTimeout);
    langFetchTimeout = window.setTimeout(fetchLangSuggestions, 500);
});

langSearchInput.addEventListener("keydown", (event) => {
    if (langSuggestions.length === 0) return;
    let newIndex = -1;
    if (event.key === "ArrowDown") {
        event.preventDefault();
        if (langSelectedSuggestionIndex < langSuggestions.length - 1) {
            newIndex = langSelectedSuggestionIndex + 1;
        } else {
            newIndex = 0;
        }
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (langSelectedSuggestionIndex > 0) {
            newIndex = langSelectedSuggestionIndex - 1;
        } else {
            newIndex = langSuggestions.length - 1;
        }
    } else if (event.key === "Enter") {
        if (langSelectedSuggestionIndex > -1) {
            event.preventDefault();
            const suggestion = langSuggestions[langSelectedSuggestionIndex];
            langSearchInput.value = suggestion.name;
            setSelectedLang(suggestion);
            langSuggestionsList.classList.add("hidden");
            termSearchInput.focus();
        }
    }
    updateSelectedLangSuggestion("key", newIndex);
});

langSearchInput.addEventListener("blur", () => {
    // Prevent the suggestions list from being hidden when user presses "Done"
    // on virtual keyboard, thereby unfocusing the input element.
    if ((hasTouchOnly || langSuggestionsListHovered) && langSelectedId === -1)
        return;
    langSuggestionsList.classList.add("hidden");
});

langSuggestionsList.addEventListener("mouseover", () => {
    langSuggestionsListHovered = true;
});

langSuggestionsList.addEventListener("mouseout", () => {
    langSuggestionsListHovered = false;
});

function updateSelectedLangSuggestion(inputType: string, newIndex = -1) {
    const suggestionElements = langSuggestionsList.getElementsByTagName("li");
    const oldSuggestion = suggestionElements[langSelectedSuggestionIndex];
    oldSuggestion?.classList.remove("highlighted");
    langSelectedSuggestionIndex = newIndex;
    const newSuggestion = suggestionElements[langSelectedSuggestionIndex];
    newSuggestion?.classList.add("highlighted");

    if (inputType === "hover" || langSelectedSuggestionIndex === -1) return;

    const elementRect = newSuggestion.getBoundingClientRect();
    const containerRect = langSuggestionsList.getBoundingClientRect();
    if (elementRect.bottom > containerRect.bottom) {
        langSuggestionsList.scrollTop +=
            elementRect.bottom - containerRect.bottom;
    } else if (elementRect.top < containerRect.top) {
        langSuggestionsList.scrollTop -= containerRect.top - elementRect.top;
    }
}

///////////////////////////
// Term stuff
///////////////////////////

const termSearchInput = document.getElementById(
    "term-input",
) as HTMLInputElement;
const termSuggestionsList = document.getElementById(
    "term-suggestions",
) as HTMLUListElement;
let termSuggestions: ItemMatch[] = [];
let termSelectedSuggestionIndex = -1;
let termSuggestionsListHovered = false;
export let termSelectedId = -1;
let termFetchTimeout: number;
let treeFetchTimeout: number;

function createTermSuggestionListItem(termSuggestion: Item, index: number) {
    const listItem = document.createElement("li");
    listItem.classList.add("suggestion-item");
    listItem.addEventListener("pointerup", () => {
        termSearchInput.value = termSuggestion.term;
        termSelectedId = termSuggestion.id;
        termSuggestionsList.classList.add("hidden");
        if (langSelectedId !== -1) {
            window.clearTimeout(treeFetchTimeout);
            treeFetchTimeout = window.setTimeout(getHeadProgenitorTree, 0);
        }
    });
    listItem.addEventListener("pointerover", function () {
        updateSelectedTermSuggestion("hover", index);
    });
    const termLine = document.createElement("div");
    termLine.classList.add("term-line");
    termLine.innerHTML = termSuggestion.term;
    listItem.appendChild(termLine);
    const posList = termSuggestion.pos ?? [];
    const glossList = termSuggestion.gloss ?? [];
    for (let i = 0; i < posList.length; i++) {
        const pos = posList[i];
        const gloss = glossList[i];
        const posLine = document.createElement("div");
        posLine.classList.add("pos-line");
        posLine.innerHTML = `<span class="pos">${pos}</span>: <span class="gloss">${gloss}</span>`;
        listItem.appendChild(posLine);
    }
    return listItem;
}

function displayTermSuggestions() {
    termSuggestionsList.innerHTML = "";
    termSelectedSuggestionIndex = -1;
    if (termSuggestions.length === 0) {
        termSuggestionsList.classList.add("hidden");
        return;
    }
    for (let i = 0; i < termSuggestions.length; i++) {
        const suggestion = termSuggestions[i];
        const li = createTermSuggestionListItem(suggestion.item, i);
        termSuggestionsList.appendChild(li);
    }
    termSuggestionsList.classList.remove("hidden");
}

async function fetchTermSuggestions() {
    if (langSelectedId === -1) {
        termSuggestionsList.innerHTML = "";
        return;
    }
    const input = encodeURIComponent(
        termSearchInput.value.trim().toLowerCase(),
    );
    if (!input) {
        termSuggestionsList.innerHTML = "";
        return;
    }
    try {
        const response = await fetch(`${api}items/${langSelectedId}/${input}`);
        const data = (await response.json()) as ItemMatches;
        console.log(data);
        termSuggestions = data.matches;
        displayTermSuggestions();
    } catch (error) {
        console.error(error);
    }
}

termSearchInput.addEventListener("input", () => {
    termSelectedId = -1;
    window.clearTimeout(termFetchTimeout);
    termFetchTimeout = window.setTimeout(fetchTermSuggestions, 500);
});

termSearchInput.addEventListener("keydown", (event) => {
    if (termSuggestions.length === 0) return;
    let newIndex = -1;
    if (event.key === "ArrowDown") {
        event.preventDefault();
        if (termSelectedSuggestionIndex < termSuggestions.length - 1) {
            newIndex = termSelectedSuggestionIndex + 1;
        } else {
            newIndex = 0;
        }
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (termSelectedSuggestionIndex > 0) {
            newIndex = termSelectedSuggestionIndex - 1;
        } else {
            newIndex = termSuggestions.length - 1;
        }
    } else if (event.key === "Enter") {
        if (termSelectedSuggestionIndex > -1) {
            event.preventDefault();
            const suggestion = termSuggestions[termSelectedSuggestionIndex];
            termSearchInput.value = suggestion.item.term;
            termSelectedId = suggestion.item.id;
            termSuggestionsList.classList.add("hidden");
            if (langSelectedId !== -1) {
                window.clearTimeout(treeFetchTimeout);
                treeFetchTimeout = window.setTimeout(getHeadProgenitorTree, 0);
            }
        }
    }
    updateSelectedTermSuggestion("key", newIndex);
});

termSearchInput.addEventListener("blur", () => {
    // Prevent the suggestions list from being hidden when user presses "Done"
    // on virtual keyboard, thereby unfocusing the input element.
    if ((hasTouchOnly || termSuggestionsListHovered) && termSelectedId === -1)
        return;
    termSuggestionsList.classList.add("hidden");
});

termSuggestionsList.addEventListener("mouseover", () => {
    termSuggestionsListHovered = true;
});

termSuggestionsList.addEventListener("mouseout", () => {
    termSuggestionsListHovered = false;
});

function updateSelectedTermSuggestion(inputType: string, newIndex = -1) {
    const suggestionElements = termSuggestionsList.getElementsByTagName("li");
    const oldSuggestion = suggestionElements[termSelectedSuggestionIndex];
    oldSuggestion?.classList.remove("highlighted");
    termSelectedSuggestionIndex = newIndex;
    const newSuggestion = suggestionElements[termSelectedSuggestionIndex];
    newSuggestion?.classList.add("highlighted");
    if (inputType === "hover" || termSelectedSuggestionIndex === -1) return;
    const elementRect = newSuggestion.getBoundingClientRect();
    const containerRect = termSuggestionsList.getBoundingClientRect();
    if (elementRect.bottom > containerRect.bottom) {
        termSuggestionsList.scrollTop +=
            elementRect.bottom - containerRect.bottom;
    } else if (elementRect.top < containerRect.top) {
        termSuggestionsList.scrollTop -= containerRect.top - elementRect.top;
    }
}
