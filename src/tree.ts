import { ExpandedItem, ExpandedItemNode } from "./types";
import { api, langSelectedId, termSelectedId } from "./search";
import { setNodeTooltipListeners } from "./tooltip";

import { create, Selection } from "d3-selection";
import { link, curveStepBefore } from "d3-shape";
import { cluster, hierarchy } from "d3-hierarchy";
import { HierarchyPointLink, HierarchyPointNode } from "d3";

const ety = document.getElementById("ety") as HTMLDivElement;
let treeData: ExpandedItem | null = null;
let treeResizeTimeout: number;

function resizeTree() {
    window.clearTimeout(treeResizeTimeout);
    treeResizeTimeout = window.setTimeout(displayHeadProgenitorTree, 500);
}

window.addEventListener("resize", resizeTree);

export async function getHeadProgenitorTree() {
    try {
        const response = await fetch(
            `${api}headProgenitorTree/${termSelectedId}/filter/${langSelectedId}`,
        );
        treeData = await response.json();
        console.log(treeData);
        displayHeadProgenitorTree();
    } catch (error) {
        console.error(error);
    }
}

function displayHeadProgenitorTree() {
    ety.innerHTML = "";
    if (treeData === null) return;
    const {
        tree: tree,
        node: node,
        nodeBackground: nodeBackground,
    } = headProgenitorTreeSVG(treeData, {
        width: ety.clientWidth,
    });
    if (tree === null) return;
    tree.setAttribute("id", "tree");
    tree.style.opacity = "0";
    ety.appendChild(tree);
    addSVGTextBackgrounds(node, nodeBackground);
    tree.style.opacity = "1";
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

const langUnrelatedColor = "#696969";

export function langColor(distance: number | null) {
    if (distance === null) return langUnrelatedColor;
    if (distance < 0) return langDistanceColors[0];
    if (distance > langDistanceColors.length)
        return langDistanceColors[langDistanceColors.length - 1];
    return langDistanceColors[distance];
}

// This function is an adaption. Original copyright notice:
//
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/tree
function headProgenitorTreeSVG(
    data: ExpandedItem,
    {
        layoutAlg = cluster, // layout algorithm (typically d3.tree or d3.cluster)
        width = 640, // outer width, in pixels
        padding = {
            // tree padding, in pixels
            outer: 5,
            node: 1,
        },
        stroke = "#555", // stroke for links
        strokeWidth = 1.0, // stroke width for links
        strokeOpacity = 1.0, // stroke opacity for links
        strokeLinejoin = "miter", // stroke line join for links
        strokeLinecap = "butt", // stroke line cap for links
        curveAlg = curveStepBefore, // curve for the link
    } = {},
) {
    // https://github.com/d3/d3-hierarchy#hierarchy
    const root = hierarchy<ExpandedItem>(data, (d: ExpandedItem) => d.children);

    root.count() // counts node leaves and assigns count to .value
        .sort((a, b) => b.height - a.height || (b.value ?? 0) - (a.value ?? 0));

    // Compute the layout.
    const dx = 12;
    const dy = width / (root.height + padding.node);
    const layout = layoutAlg<ExpandedItem>()
        .nodeSize([dx, dy])
        .separation((a, b) => (a.parent == b.parent ? 4 : 4));
    const root_layout = layout(root);

    // Center the tree.
    let x0 = Infinity;
    let x1 = -x0;
    root_layout.each((d) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });

    // Compute the height.
    const height = x1 - x0 + dx * 2;

    const viewBox = [
        (-dy * padding.node) / 2 - padding.outer,
        x0 - dx,
        width + padding.outer * 2,
        height,
    ];

    const svg = create("svg")
        .attr("version", "1.1")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
        .attr("viewBox", viewBox)
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .attr("shape-rendering", "crispEdges")
        .attr("vector-effect", "non-scaling-stroke")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .attr("text-rendering", "optimizeLegibility");

    // the lines forming the tree
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
        .attr(
            "d",
            link<
                HierarchyPointLink<ExpandedItem>,
                HierarchyPointNode<ExpandedItem>
            >(curveAlg)
                .x((d) => d.y)
                .y((d) => d.x),
        );

    const descendants: ExpandedItemNode[] = root_layout
        .descendants()
        .map(function (d) {
            return { node: d, bbox: new DOMRect(0, 0, 0, 0) };
        });

    // placeholder rects for text backgrounds to be set in addSVGTextBackgrounds()
    const nodeBackground = svg
        .append("g")
        .selectAll<SVGRectElement, unknown>("rect")
        .data(descendants)
        .join("rect")
        .attr("fill", "white");

    // the text nodes
    const node = svg
        .append("g")
        .selectAll<SVGTextElement, unknown>("text")
        .data(descendants)
        .join("text")
        .attr("font-weight", (d) =>
            d.node.data.item.id == termSelectedId ? "bold" : null,
        )
        .attr("transform", (d) => `translate(${d.node.y},${d.node.x})`);

    node.append("tspan")
        .attr("class", "lang")
        .attr("x", 0)
        .attr("dy", "-0.92em")
        .attr("fill", (d) => langColor(d.node.data.langDistance))
        .text((d) => d.node.data.item.lang);

    node.append("tspan")
        .attr("class", "term")
        .attr("x", 0)
        .attr("dy", "1.2em")
        .text((d) => d.node.data.item.term);

    node.append("tspan")
        .attr("class", "romanization")
        .attr("x", 0)
        .attr("dy", "1.3em")
        .text((d) =>
            d.node.data.item.romanization
                ? `(${d.node.data.item.romanization})`
                : "",
        );

    setNodeTooltipListeners(node);

    return { tree: svg.node(), node: node, nodeBackground: nodeBackground };
}

function addSVGTextBackgrounds(
    node: Selection<SVGTextElement, ExpandedItemNode, SVGGElement, undefined>,
    nodeBackground: Selection<
        SVGRectElement,
        ExpandedItemNode,
        SVGGElement,
        undefined
    >,
) {
    node.each(function (d) {
        d.bbox = this.getBBox();
    });

    const xMargin = 3;
    const yMargin = 3;

    nodeBackground
        .attr("width", (d) => d.bbox.width + 2 * xMargin)
        .attr("height", (d) => d.bbox.height + 2 * yMargin)
        .attr("transform", function (d) {
            const x = d.node.y - xMargin;
            const y = d.node.x - yMargin;
            return `translate(${x},${y})`;
        })
        .attr("x", (d) => d.bbox.x)
        .attr("y", (d) => d.bbox.y);
}
