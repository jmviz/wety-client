import { ExpandedItem } from "./types";
import { langColor } from "./tree";

import { Selection, HierarchyPointNode, BaseType } from "d3";

const tooltip = document.getElementById("tooltip") as HTMLDivElement;
let tooltipHideTimeout: number;
tooltip.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") {
        window.clearTimeout(tooltipHideTimeout);
    }
});
tooltip.addEventListener("pointerleave", hideTooltip);

export function setNodeTooltipListeners(
    node: Selection<
        BaseType,
        HierarchyPointNode<ExpandedItem>,
        SVGGElement,
        undefined
    >,
) {
    // for non-mouse, show tooltip on pointerup
    node.on("pointerup", (event, d) => {
        if (event.pointerType !== "mouse") {
            showTooltip(event, d, "fixed");
        }
    });

    // for mouse, show tooltip on hover
    node.on("pointerenter", (event, d) => {
        if (event.pointerType === "mouse") {
            window.clearTimeout(tooltipHideTimeout);
            showTooltip(event, d, "hover");
        }
    });

    node.on("pointerleave", (event) => {
        if (event.pointerType === "mouse") {
            tooltipHideTimeout = window.setTimeout(hideTooltip, 200);
        }
    });
}

function etyPrep(etyMode: string): string {
    switch (etyMode) {
        case "derived":
        case "inherited":
        case "borrowed":
        case "back-formation":
            return "from";
        case "compound":
        case "univerbation":
        case "transfix":
        case "surface analysis":
        case "suffix":
        case "prefix":
        case "infix":
        case "confix":
        case "circumfix":
        case "blend":
        case "affix":
            return "with";
        case "vṛddhi":
        case "vṛddhi-ya":
            return "derivative of";
        case "root":
            return "reflex of";
        case "mention":
            return "in";
        default:
            return "of";
    }
}

function setTooltipHTML(selection: HierarchyPointNode<ExpandedItem>) {
    tooltip.innerHTML = "";

    const closeButton = document.createElement("button");
    closeButton.textContent = "✕";
    closeButton.classList.add("close-button");
    tooltip.appendChild(closeButton);
    closeButton.addEventListener("pointerup", hideTooltip);

    const item = selection.data.item;
    const parent = selection.parent
        ? {
              lang: selection.parent.data.item.lang,
              term: selection.parent.data.item.term,
              langDistance: selection.parent.data.langDistance,
          }
        : null;

    const lang = document.createElement("p");
    lang.classList.add("lang");
    lang.style.color = langColor(selection.data.langDistance);
    lang.textContent = `${item.lang}`;
    tooltip.appendChild(lang);

    const term = document.createElement("p");
    term.innerHTML =
        `<span class="term">${item.term}</span>` +
        (item.romanization
            ? ` <span class="romanization">(${item.romanization})</span>`
            : "");
    tooltip.appendChild(term);

    if (item.imputed) {
        const imputed = document.createElement("div");
        imputed.classList.add("pos-line");
        imputed.innerHTML = `<span class="imputed">(imputed)</span>`;
        tooltip.appendChild(imputed);
    } else if (
        item.pos &&
        item.gloss &&
        item.pos.length === item.gloss.length
    ) {
        const posGloss = document.createElement("div");
        const posList = item.pos ?? [];
        const glossList = item.gloss ?? [];
        for (let i = 0; i < posList.length; i++) {
            const pos = posList[i];
            const gloss = glossList[i];
            const posLine = document.createElement("div");
            posLine.classList.add("pos-line");
            posLine.innerHTML = `<span class="pos">${pos}</span>: <span class="gloss">${gloss}</span>`;
            posGloss.appendChild(posLine);
        }
        tooltip.appendChild(posGloss);
    }

    if (item.etyMode && parent) {
        const ety = document.createElement("p");
        const prep = etyPrep(item.etyMode);
        const color = langColor(parent.langDistance);
        ety.innerHTML = `<span class="ety-mode">${item.etyMode}</span> <span class="ety-prep">${prep}</span> <span class="parent-lang" style="color: ${color};">${parent.lang}</span> <span class="parent-term">${parent.term}</span>`;
        tooltip.appendChild(ety);
    }

    if (item.url) {
        const container = document.createElement("div");
        container.classList.add("wiktionary-link-container");
        const link = document.createElement("a");
        link.textContent = "Wiktionary";
        link.href = item.url;
        link.target = "_blank";
        link.classList.add("wiktionary-link");
        container.appendChild(link);
        tooltip.appendChild(container);
    }
}

function positionHoverTooltip(event: MouseEvent) {
    const tooltipRect = tooltip.getBoundingClientRect();
    const cursorX = event.clientX + window.scrollX;
    const cursorY = event.clientY + window.scrollY;

    const midX = window.innerWidth / 2;
    const midY = window.innerHeight / 2;

    let tooltipX, tooltipY;

    if (cursorX <= midX && cursorY <= midY) {
        // Cursor is in the top-left quadrant
        tooltipX = cursorX + 10;
        tooltipY = cursorY + 10;
    } else if (cursorX > midX && cursorY <= midY) {
        // Cursor is in the top-right quadrant
        tooltipX = cursorX - tooltipRect.width - 10;
        tooltipY = cursorY + 10;
    } else if (cursorX <= midX && cursorY > midY) {
        // Cursor is in the bottom-left quadrant
        tooltipX = cursorX + 10;
        tooltipY = cursorY - tooltipRect.height - 10;
    } else {
        // Cursor is in the bottom-right quadrant
        tooltipX = cursorX - tooltipRect.width - 10;
        tooltipY = cursorY - tooltipRect.height - 10;
    }

    tooltip.style.left = tooltipX + "px";
    tooltip.style.top = tooltipY + "px";
}

function positionFixedTooltip() {
    tooltip.style.display = "block";
    tooltip.style.position = "fixed";
    tooltip.style.top = "50%";
    tooltip.style.left = "50%";
    tooltip.style.transform = "translate(-50%, -50%)";
    tooltip.style.opacity = "1";
}

function positionTooltip(event: MouseEvent, type: string) {
    if (type === "hover") {
        positionHoverTooltip(event);
    } else {
        positionFixedTooltip();
    }
}

function showTooltip(
    event: MouseEvent,
    selection: HierarchyPointNode<ExpandedItem>,
    type: string,
) {
    setTooltipHTML(selection);
    positionTooltip(event, type);
    tooltip.style.opacity = "1";
    tooltip.style.zIndex = "9000";
}

function hideTooltip() {
    tooltip.style.opacity = "0";
    tooltip.style.zIndex = "-9000";
}
