const langSearchInput = document.getElementById('lang-input');
const langSuggestionsList = document.getElementById('lang-suggestions');
let langSuggestions = [];
let langSelectedSuggestionIndex = -1;
let langSuggestionsListHovered = false;
let langSelectedId = -1;

let langFetchTimeoutId;

const api = window.location.hostname === 'localhost' ? 'http://localhost:3000/' : 'https://api.wety.org/';

function displayLangSuggestions() {
    langSuggestionsList.innerHTML = '';
    langSelectedSuggestionIndex = -1;
    if (langSuggestions.length === 0) {
        langSuggestionsList.classList.add('hidden');
        return;
    }
    langSuggestionsList.classList.remove('hidden');
    langSuggestions.forEach((suggestion, index) => {
        const li = document.createElement('li');
        li.classList.add('suggestion-item');
        li.textContent = suggestion.lang;
        li.addEventListener('click', () => {
            langSearchInput.value = suggestion.lang;
            langSelectedId = suggestion.id;
            langSuggestionsList.classList.add('hidden');
        });
        langSuggestionsList.appendChild(li);
        if (index === langSelectedSuggestionIndex) {
            li.classList.add('selected');
        }
    });
}

async function fetchLangSuggestions() {
    const input = encodeURIComponent(langSearchInput.value.toLowerCase());
    if (!input) {
        langSuggestionsList.innerHTML = '';
        return;
    }
    try {
        const response = await fetch(`${api}langs/${input}`);
        const data = await response.json();
        console.log(data);
        langSuggestions = data.matches;
        displayLangSuggestions();
    } catch (error) {
        console.error(error);
    }
}

langSearchInput.addEventListener('input', () => {
    clearTimeout(langFetchTimeoutId);
    langFetchTimeoutId = setTimeout(fetchLangSuggestions, 500);
});

langSearchInput.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (langSelectedSuggestionIndex < langSuggestions.length - 1) {
            langSelectedSuggestionIndex++;
        }
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (langSelectedSuggestionIndex > -1) {
            langSelectedSuggestionIndex--;
        }
    } else if (event.key === 'Tab' || event.key === 'Enter') {
        if (langSelectedSuggestionIndex > -1) {
            event.preventDefault();
            const suggestion = langSuggestions[langSelectedSuggestionIndex];
            langSearchInput.value = suggestion.lang;
            langSelectedId = suggestion.id;
            langSuggestionsList.classList.add('hidden');
            langSelectedSuggestionIndex = -1;
        }
    }
    updateSelectedLangSuggestion();
});

langSearchInput.addEventListener('blur', () => {
    if (!langSuggestionsListHovered) {
        langSuggestionsList.classList.add('hidden');
    }
});

langSearchInput.addEventListener('focus', () => {
    langSuggestionsList.classList.remove('hidden');
});

langSuggestionsList.addEventListener('mouseover', () => {
    langSuggestionsListHovered = true;
});

langSuggestionsList.addEventListener('mouseout', () => {
    langSuggestionsListHovered = false;
});

function updateSelectedLangSuggestion() {
    const suggestionElements = langSuggestionsList.getElementsByTagName('li');
    for (let i = 0; i < suggestionElements.length; i++) {
        const suggestionElement = suggestionElements[i];
        if (i === langSelectedSuggestionIndex) {
            suggestionElement.classList.add('selected');
            const elementRect = suggestionElement.getBoundingClientRect();
            const containerRect = langSuggestionsList.getBoundingClientRect();
            if (elementRect.bottom > containerRect.bottom) {
                langSuggestionsList.scrollTop += elementRect.bottom - containerRect.bottom;
            } else if (elementRect.top < containerRect.top) {
                langSuggestionsList.scrollTop -= containerRect.top - elementRect.top;
            }
        } else {
            suggestionElement.classList.remove('selected');
        }
    }
}

///////////////////////////
//Term stuff
///////////////////////////

const termSearchInput = document.getElementById('term-input');
const termSuggestionsList = document.getElementById('term-suggestions');
let termSuggestions = [];
let termSelectedSuggestionIndex = -1;
let termSuggestionsListHovered = false;
let termSelectedId = -1;

let termFetchTimeoutId;

function createTermSuggestionListItem(termSuggestion) {
    const listItem = document.createElement('li');
    listItem.classList.add('suggestion-item');
    listItem.addEventListener('click', () => {
        termSearchInput.value = termSuggestion.term;
        termSelectedId = termSuggestion.id;
        termSuggestionsList.classList.add('hidden');
        if (langSelectedId !== -1) {
            createTree()
        }
    });
    const termLine = document.createElement('div');
    termLine.classList.add('term-line');
    termLine.innerHTML = termSuggestion.term;
    listItem.appendChild(termLine);
    for (let i = 0; i < termSuggestion.pos.length; i++) {
        const pos = termSuggestion.pos[i];
        const gloss = termSuggestion.gloss[i];
        const posLine = document.createElement('div');
        posLine.classList.add('pos-line');
        posLine.innerHTML = `<span class="pos">${pos}</span>: <span class="gloss">${gloss}</span>`;
        listItem.appendChild(posLine);
    }
    return listItem
}

function displayTermSuggestions() {
    termSuggestionsList.innerHTML = '';
    termSelectedSuggestionIndex = -1;
    if (termSuggestions.length === 0) {
        termSuggestionsList.classList.add('hidden');
        return;
    }
    termSuggestionsList.classList.remove('hidden');
    termSuggestions.forEach((suggestion, index) => {
        const li = createTermSuggestionListItem(suggestion.item);
        termSuggestionsList.appendChild(li);
        if (index === termSelectedSuggestionIndex) {
            li.classList.add('selected');
        }
    });
}

async function fetchTermSuggestions() {
    const input = encodeURIComponent(termSearchInput.value.toLowerCase());
    if (!input) {
        termSuggestionsList.innerHTML = '';
        return;
    }
    try {
        const response = await fetch(`${api}items/${langSelectedId}/${input}`);
        const data = await response.json();
        console.log(data);
        termSuggestions = data.matches;
        displayTermSuggestions();
    } catch (error) {
        console.error(error);
    }
}

termSearchInput.addEventListener('input', () => {
    clearTimeout(termFetchTimeoutId);
    termFetchTimeoutId = setTimeout(fetchTermSuggestions, 500);
});

termSearchInput.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (termSelectedSuggestionIndex < termSuggestions.length - 1) {
            termSelectedSuggestionIndex++;
        }
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (termSelectedSuggestionIndex > -1) {
            termSelectedSuggestionIndex--;
        }
    } else if (event.key === 'Tab' || event.key === 'Enter') {
        if (termSelectedSuggestionIndex > -1) {
            event.preventDefault();
            const suggestion = termSuggestions[termSelectedSuggestionIndex];
            termSearchInput.value = suggestion.item.term;
            termSelectedId = suggestion.id;
            termSuggestionsList.classList.add('hidden');
            if (langSelectedId !== -1) {
                createTree()
            }
            termSelectedSuggestionIndex = -1;
        }
    }

    updateSelectedTermSuggestion();
});

termSearchInput.addEventListener('blur', () => {
    if (!termSuggestionsListHovered) {
        termSuggestionsList.classList.add('hidden');
    }
});

termSearchInput.addEventListener('focus', () => {
    termSuggestionsList.classList.remove('hidden');
});

termSuggestionsList.addEventListener('mouseover', () => {
    termSuggestionsListHovered = true;
});

termSuggestionsList.addEventListener('mouseout', () => {
    termSuggestionsListHovered = false;
});

function updateSelectedTermSuggestion() {
    const suggestionElements = termSuggestionsList.getElementsByTagName('li');
    for (let i = 0; i < suggestionElements.length; i++) {
        const suggestionElement = suggestionElements[i];
        if (i === termSelectedSuggestionIndex) {
            suggestionElement.classList.add('selected');
            const elementRect = suggestionElement.getBoundingClientRect();
            const containerRect = termSuggestionsList.getBoundingClientRect();
            if (elementRect.bottom > containerRect.bottom) {
                termSuggestionsList.scrollTop += elementRect.bottom - containerRect.bottom;
            } else if (elementRect.top < containerRect.top) {
                termSuggestionsList.scrollTop -= containerRect.top - elementRect.top;
            }
        } else {
            suggestionElement.classList.remove('selected');
        }
    }
}
