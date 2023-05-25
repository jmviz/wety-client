import { ExpandedItem } from "./types";
import { api, langSelectedId, termSelectedId } from "./search";

import { create } from "d3-selection";
import { link, curveStepBefore } from "d3-shape";
import { cluster, hierarchy } from "d3-hierarchy";
import { HierarchyPointLink, HierarchyPointNode } from "d3";

let treeData: ExpandedItem | null = null;
let treeResizeTimeout: number;
const ety = document.getElementById("ety")!;
const tooltip = document.getElementById("tooltip")!;

window.addEventListener("resize", resizeTree);

function resizeTree() {
    window.clearTimeout(treeResizeTimeout);
    treeResizeTimeout = window.setTimeout(displayHeadProgenitorTree, 500);
}

export async function getHeadProgenitorTree() {
    try {
        const response = await fetch(`${api}headProgenitorTree/${termSelectedId}/filter/${langSelectedId}`);
        treeData = await response.json();
        console.log(treeData);
        displayHeadProgenitorTree();

    } catch (error) {
        console.error(error);
    }
}

function displayHeadProgenitorTree() {
    ety.innerHTML = '';
    if (treeData === null) return;
    let tree = HeadProgenitorTreeSVG(treeData, {
        width: ety.clientWidth,
    });
    if (tree === null) return;
    tree.setAttribute("id", "tree");
    ety.appendChild(tree);
}

// https://accessiblepalette.com/?lightness=98.2,93.95,85.1,76.5,67.65,52,47.6,40.4,32.4,23.55&770039=1,12&720614=1,0&672000=1,0&493500=1,0&224000=1,0&004300=1,0&004a32=1,0&004f64=1,0&004e94=1,0&003c88=1,0&2e2d79=1,0&750039=1,0
const langDistanceColors = [
    "#2F2E7A",
    "#0B3577",
    "#143867",
    "#0D3D4D",
    "#06412C",
    "#004300",
    "#224000",
    "#493500",
    "#672001",
    "#740A16",
    "#740549",
    "#730138",
];

// const langUnrelatedColor = "#767676";
const langUnrelatedColor = "#000000";

function langColor(distance: number | null) {
    if (distance === null) return langUnrelatedColor;
    if (distance < 0) return langDistanceColors[0];
    if (distance > langDistanceColors.length) return langDistanceColors[langDistanceColors.length - 1];
    return langDistanceColors[distance];
}

// This function is an adaption. Original copyright notice:
//
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/tree
function HeadProgenitorTreeSVG(data: ExpandedItem, {
    layout = cluster, // layout algorithm (typically d3.tree or d3.cluster)
    width = 640, // outer width, in pixels
    padding = 1, // horizontal padding for first and last column
    stroke = "#555", // stroke for links
    strokeWidth = 1.5, // stroke width for links
    strokeOpacity = 0.4, // stroke opacity for links
    strokeLinejoin = "miter", // stroke line join for links
    strokeLinecap = "butt", // stroke line cap for links
    halo = "#fff", // color of label halo 
    haloWidth = 3, // padding around the labels
    curve = curveStepBefore, // curve for the link
} = {}) {

    // https://github.com/d3/d3-hierarchy#hierarchy
    let root = hierarchy<ExpandedItem>(data, (d: ExpandedItem) => d.children);

    root
        .count() // counts node leaves and assigns count to .value
        .sort((a, b) => b.height - a.height || (b.value ?? 0) - (a.value ?? 0));

    // Compute the layout.
    const dx = 12;
    const dy = width / (root.height + padding);
    let root_layout = layout<ExpandedItem>()
        .nodeSize([dx, dy])
        .separation((a, b) => a.parent == b.parent ? 2.5 : 3)
        (root);

    // Center the tree.
    let x0 = Infinity;
    let x1 = -x0;
    root_layout.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });

    // Compute the height.
    const height = x1 - x0 + dx * 2;

    const svg = create("svg")
        .attr("version", "1.1")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
        .attr("viewBox", [-dy * padding / 2, x0 - dx - 5, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10);

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", stroke)
        .attr("stroke-opacity", strokeOpacity)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-width", strokeWidth)
        .selectAll("path")
        .data(root_layout.links())
        .join("path")
        .attr("d", link<HierarchyPointLink<any>, HierarchyPointNode<any>>(curve)
            .x(d => d.y)
            .y(d => d.x));

    const node = svg.append("g")
        .selectAll("a")
        .data(root_layout.descendants())
        .join("a")
        .attr("xlink:href", d => d.data.item.url)
        .attr("target", "_blank")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("class", "node");

    const text = node.append("text")
        .attr("x", d => d.children ? -6 : 6)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .attr("paint-order", "stroke")
        .attr("stroke", halo)
        .attr("stroke-width", haloWidth);

    text.append("tspan")
        .attr("class", "lang")
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .attr("dy", "-1.0em")
        .attr("fill", d => langColor(d.data.langDistance))
        .text(d => d.data.item.lang);

    text.append("tspan")
        .attr("class", "term")
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .attr("dy", "1.0em")
        .text(d => d.data.item.term);

    text.append("tspan")
        .attr("class", "romanization")
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .attr("dy", "1.0em")
        .text(d => d.data.item.romanization ? `(${d.data.item.romanization})` : "");

    node.on("mouseover", (e: MouseEvent, d) => showTooltip(e, d));

    node.on("mouseout", hideTooltip);

    return svg.node();
}

function etyPrep(etyMode: string): string {
    switch (etyMode) {
        case 'derived':
        case 'inherited':
        case 'borrowed':
        case 'back-formation':
            return 'from';
        case 'compound':
        case 'univerbation':
        case 'transfix':
        case 'surface analysis':
        case 'suffix':
        case 'prefix':
        case 'infix':
        case 'confix':
        case 'circumfix':
        case 'blend':
        case 'affix':
            return 'with';
        case 'root':
            return 'reflex of';
        case 'mention':
            return 'in';
        default:
            return 'of';
    }
}

function setTooltipHTML(selection: HierarchyPointNode<ExpandedItem>) {
    tooltip.innerHTML = '';

    const item = selection.data.item;
    const parent = selection.parent ? {
        lang: selection.parent.data.item.lang,
        term: selection.parent.data.item.term,
        langDistance: selection.parent.data.langDistance,
    } : null;

    const lang = document.createElement('p');
    lang.classList.add('lang');
    lang.style.color = langColor(selection.data.langDistance);
    lang.textContent = `${item.lang}`;
    tooltip.appendChild(lang);

    const term = document.createElement('p');
    term.innerHTML = `<span class="term">${item.term}</span>` + (item.romanization ? ` <span class="romanization">(${item.romanization})</span>` : '');
    tooltip.appendChild(term);

    if (item.imputed) {
        const imputed = document.createElement('div');
        imputed.classList.add('pos-line');
        imputed.innerHTML = `<span class="imputed">(imputed)</span>`;
        tooltip.appendChild(imputed);
    } else if (item.pos && item.gloss && item.pos.length === item.gloss.length) {
        const posGloss = document.createElement('div');
        const posList = item.pos ?? [];
        const glossList = item.gloss ?? [];
        for (let i = 0; i < posList.length; i++) {
            const pos = posList[i];
            const gloss = glossList[i];
            const posLine = document.createElement('div');
            posLine.classList.add('pos-line');
            posLine.innerHTML = `<span class="pos">${pos}</span>: <span class="gloss">${gloss}</span>`;
            posGloss.appendChild(posLine);
        }
        tooltip.appendChild(posGloss);
    }

    if (item.etyMode && parent) {
        const ety = document.createElement('p');
        const prep = etyPrep(item.etyMode);
        const color = langColor(parent.langDistance);
        ety.innerHTML = `<span class="ety-mode">${item.etyMode}</span> <span class="ety-prep">${prep}</span> <span class="parent-lang" style="color: ${color};">${parent.lang}</span> <span class="parent-term">${parent.term}</span>`
        tooltip.appendChild(ety);
    }
}

function positionTooltip(event: MouseEvent) {
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

function showTooltip(event: MouseEvent, selection: HierarchyPointNode<ExpandedItem>) {
    setTooltipHTML(selection);
    positionTooltip(event);
    tooltip.style.opacity = "1";
}

function hideTooltip() {
    tooltip.style.opacity = "0";
} 