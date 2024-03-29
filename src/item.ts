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
