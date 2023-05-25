// API responses:

export interface LangMatch {
    code: string;
    id: number;
    items: number;
    name: string;
    similarity: number;
}

export interface LangMatches {
    matches: LangMatch[];
}

export interface ItemMatch {
    distance: number;
    item: Item;
}

export interface ItemMatches {
    matches: ItemMatch[];
}

export interface Item {
    id: number;
    etyNum: number;
    lang: string;
    term: string;
    etyMode: string | null;
    imputed: boolean;
    reconstructed: boolean;
    url: string | null;
    pos: string[] | null;
    gloss: string[] | null;
    romanization: string | null;
}

export interface ExpandedItem {
    item: Item;
    children: ExpandedItem[] | null;
    langDistance: number | null;
}