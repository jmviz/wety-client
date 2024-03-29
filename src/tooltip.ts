import { ExpandedItem } from "./item";
import { ExpandedItemNode, langColor } from "./tree";

import { Selection, HierarchyPointNode } from "d3";

const tooltip = document.getElementById("tooltip") as HTMLDivElement;
let tooltipHideTimeout: number;
let tooltipShowTimeout: number;
tooltip.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") {
        window.clearTimeout(tooltipHideTimeout);
    }
});
tooltip.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") {
        window.clearTimeout(tooltipShowTimeout);
        tooltipHideTimeout = window.setTimeout(hideTooltip, 100);
    }
});

export function setNodeTooltipListeners(
    node: Selection<
        SVGGElement | SVGTextElement,
        ExpandedItemNode,
        SVGGElement,
        undefined
    >,
) {
    // for non-mouse, show tooltip on pointerup
    node.on("pointerup", function (event, d) {
        if (event.pointerType !== "mouse") {
            showTooltip(d.node, this, "fixed");
        }
    });

    // for mouse, show tooltip on hover
    node.on("pointerenter", function (event, d) {
        if (event.pointerType === "mouse") {
            window.clearTimeout(tooltipHideTimeout);
            tooltipShowTimeout = window.setTimeout(() => {
                showTooltip(d.node, this, "hover");
            }, 100);
        }
    });

    node.on("pointerleave", (event) => {
        if (event.pointerType === "mouse") {
            window.clearTimeout(tooltipShowTimeout);
            tooltipHideTimeout = window.setTimeout(hideTooltip, 100);
        }
    });
}

function etyPrep(etyMode: string): string {
    switch (etyMode) {
        case "derived":
        case "undefined derivation":
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

function setTooltipHTML(
    selection: HierarchyPointNode<ExpandedItem>,
    type: string,
) {
    tooltip.innerHTML = "";

    if (type === "fixed") {
        const closeButton = document.createElement("button");
        closeButton.textContent = "✕";
        closeButton.classList.add("close-button");
        tooltip.appendChild(closeButton);
        closeButton.addEventListener("pointerup", hideTooltip);
    }

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
        const ety = document.createElement("div");
        ety.classList.add("ety-line");
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

function positionHoverTooltip(element: SVGElement) {
    tooltip.style.position = "absolute";

    const tooltipRect = tooltip.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    // Position the tooltip above the element. If there is not enough space,
    // position it below the element.
    if (elementRect.top >= tooltipRect.height) {
        tooltip.style.top =
            elementRect.top + window.scrollY - tooltipRect.height + "px";
    } else {
        tooltip.style.top = elementRect.bottom + window.scrollY + "px";
    }

    // Align the tooltip with the left side of the element. If there is not
    // enough space, align it with the right side.
    if (elementRect.left + tooltipRect.width <= window.innerWidth) {
        tooltip.style.left = elementRect.left + window.scrollX + "px";
    } else {
        tooltip.style.left =
            elementRect.right + window.scrollX - tooltipRect.width + "px";
    }
}

function positionFixedTooltip() {
    tooltip.style.position = "fixed";
    tooltip.style.top = "50%";
    tooltip.style.left = "50%";
    tooltip.style.transform = "translate(-50%, -50%)";
}

function positionTooltip(element: SVGElement, type: string) {
    if (type === "hover") {
        positionHoverTooltip(element);
    } else {
        positionFixedTooltip();
    }
}

function showTooltip(
    node: HierarchyPointNode<ExpandedItem>,
    element: SVGElement,
    type: string,
) {
    hideTooltip();
    setTooltipHTML(node, type);
    positionTooltip(element, type);
    tooltip.style.zIndex = "9000";
    tooltip.style.opacity = "1";
}

function hideTooltip() {
    tooltip.style.opacity = "0";
    tooltip.style.zIndex = "-9000";
    tooltip.innerHTML = "";
    tooltip.style.top = "0px";
    tooltip.style.left = "0px";
}
