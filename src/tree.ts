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
        .attr("class", "tooltipped");

    const text = node.append("text")
        .attr("x", d => d.children ? -6 : 6)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .attr("paint-order", "stroke")
        .attr("stroke", halo)
        .attr("stroke-width", haloWidth);

    text.append("tspan")
        .attr("class", "tree-node-lang")
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .attr("dy", "-1.0em")
        .text(d => d.data.item.lang);

    text.append("tspan")
        .attr("class", "tree-node-term")
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .attr("dy", "1.0em")
        .text(d => d.data.item.term);

    text.append("tspan")
        .attr("class", "tree-node-romanization")
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .attr("dy", "1.0em")
        .text(d => d.data.item.romanization ? `(${d.data.item.romanization})` : "");

    node.on("mouseover", (e: MouseEvent, d) => showTooltip(e, d));

    node.on("mouseout", hideTooltip);

    return svg.node();
}

function showTooltip(event: MouseEvent, selection: HierarchyPointNode<ExpandedItem>) {
    const item = selection.data.item;
    tooltip.innerHTML = item.lang;

    const tooltipRect = tooltip.getBoundingClientRect();
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    let tooltipX = cursorX + 10;
    if (tooltipX + tooltipRect.width > window.innerWidth + window.scrollX) {
        tooltipX = cursorX - tooltipRect.width - 10;
    }
    tooltip.style.left = tooltipX + window.scrollX + "px";

    let tooltipY = cursorY - 15;
    if (tooltipY + tooltipRect.height > window.innerHeight + window.scrollY) {
        tooltipY = cursorY - tooltipRect.height + 15;
    }
    tooltip.style.top = tooltipY + window.scrollY + "px";

    tooltip.style.opacity = "1";
}

function hideTooltip() {
    tooltip.style.opacity = "0";
} 