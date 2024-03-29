import { API_BASE_URL } from "./api";
import { ExpandedItem } from "./item";
import { LANG_SEARCH, ITEM_SEARCH } from "./search";
import { setNodeTooltipListeners } from "./tooltip";
import cluster from "./treeCluster";

import { create, Selection } from "d3-selection";
import { link, curveStepBefore } from "d3-shape";
import {
    hierarchy,
    HierarchyPointLink,
    HierarchyPointNode,
} from "d3-hierarchy";

export interface ExpandedItemNode {
    node: HierarchyPointNode<ExpandedItem>;
    bbox: SVGRect;
}

const ety = document.getElementById("ety") as HTMLDivElement;
let treeData: ExpandedItem | null = null;

export async function getHeadProgenitorTree() {
    try {
        const lang = LANG_SEARCH.selectedId;
        const item = ITEM_SEARCH.selectedId;
        const response = await fetch(
            `${API_BASE_URL}headProgenitorTree/${item}?lang=${lang}`,
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
        svgElement: svgElement,
        nodeSelection: nodeSelection,
        nodeBackgroundSelection: nodeBackgroundSelection,
    } = headProgenitorTreeSVG(treeData);
    if (svgElement === null) return;
    svgElement.setAttribute("id", "tree");
    svgElement.style.opacity = "0";
    ety.appendChild(svgElement);
    addSVGTextBackgrounds(nodeSelection, nodeBackgroundSelection);
    window.scrollTo(document.body.scrollWidth, 0);
    svgElement.style.opacity = "1";
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

// The basic skeleton of this function is adapted from:
//
// https://observablehq.com/@d3/tree
//
// which has the following copyright and license notice:
//
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
function headProgenitorTreeSVG(data: ExpandedItem) {
    // https://github.com/d3/d3-hierarchy#hierarchy
    const root = hierarchy<ExpandedItem>(data, (d: ExpandedItem) => d.children);

    const searched = root.find(
        (d) => d.data.item.id === ITEM_SEARCH.selectedId,
    );
    const searchedAncestors = searched?.ancestors() ?? [];

    root.count() // counts node leaves and assigns count to .value
        .sort(
            (a, b) =>
                +searchedAncestors.includes(a) -
                    +searchedAncestors.includes(b) ||
                a.height - b.height ||
                (a.value ?? 0) - (b.value ?? 0) ||
                +(a.data.item.term < b.data.item.term) * 2 - 1,
        );

    // This assumes the font-size of the ety div is set to "small", as it should
    // be in the stylesheet.
    const small_font_px = parseFloat(window.getComputedStyle(ety).fontSize);

    // There is a confusion between "x" and "y" concepts in the below. The d3
    // api assumes that the tree is oriented vertically, with the root at the
    // top and the leaves at the bottom. But we are using a horizontal tree,
    // with the root on the left and the leaves on the right. So variables
    // defined by d3 like e.g. `root.height` and `d.x` correspond in our case to
    // width and y.

    // const dx = 125;
    // const dy = 12;
    // const sep = 4;
    const dx = 10 * small_font_px;
    const dy = small_font_px;
    const sep = Math.floor(0.25 * small_font_px);
    const layout = cluster<ExpandedItem>()
        .nodeSize([dy, dx])
        .separation((a, b) => (a.parent == b.parent ? sep : sep));
    const pointRoot = layout(root);

    // Center the tree vertically.
    let y0 = Infinity;
    let y1 = -y0;
    pointRoot.each((d) => {
        if (d.x > y1) y1 = d.x;
        if (d.x < y0) y0 = d.x;
    });

    // root.height is the number of links between the root and the furthest leaf.
    const width = (root.height + 1) * dx;
    const height = y1 - y0 + dy * 4;

    const viewBox = [-dx / 2, y0 - dy * 2, width, height];

    // crispEdges implementation quality varies from browser to browser. It
    // generally seems to work well but for example Windows Firefox renders
    // random lines with 2px instead of 1px. Consider this as a solution:
    // https://github.com/engray/subpixelFix.
    const svg = create("svg")
        .attr("version", "1.1")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
        .attr("viewBox", viewBox)
        .attr("width", width)
        .attr("height", height)
        .attr(
            "style",
            `min-width: ${width}px; max-width: ${width}px; height: auto; height: intrinsic;`,
        )
        .attr("shape-rendering", "crispEdges")
        .attr("vector-effect", "non-scaling-stroke")
        .attr("text-anchor", "middle")
        .attr("text-rendering", "optimizeLegibility")
        // this noop event listener is to cajole mobile browsers (or, at least,
        // ios webkit) into responding to touch events on svg elements, cf.
        // https://stackoverflow.com/a/65777666/10658294
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .on("touchstart", () => {});

    // the lines forming the tree
    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 1.0)
        .attr("stroke-linecap", "butt")
        .attr("stroke-linejoin", "miter")
        .attr("stroke-width", 1.0)
        .selectAll("path")
        .data(pointRoot.links())
        .join("path")
        .attr(
            "d",
            link<
                HierarchyPointLink<ExpandedItem>,
                HierarchyPointNode<ExpandedItem>
            >(curveStepBefore)
                .x((d) => d.y)
                .y((d) => d.x),
        );

    const descendants: ExpandedItemNode[] = pointRoot
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
        .selectAll<SVGTextElement, unknown>("g")
        .data(descendants)
        .join("g")
        .attr("font-weight", (d) =>
            d.node.data.item.id == ITEM_SEARCH.selectedId ? "bold" : null,
        )
        .attr("transform", (d) => `translate(${d.node.y},${d.node.x})`);

    node.append("text")
        .attr("class", "lang")
        .attr("y", "-1em")
        .attr("fill", (d) => langColor(d.node.data.langDistance))
        .text((d) => d.node.data.item.lang);

    node.append("text")
        .attr("class", "term")
        .attr("y", "0.25em")
        .text((d) => d.node.data.item.term);

    node.append("text")
        .attr("class", "romanization")
        .attr("y", "1.5em")
        .text((d) =>
            d.node.data.item.romanization
                ? `(${d.node.data.item.romanization})`
                : "",
        );

    setNodeTooltipListeners(node);

    return {
        svgElement: svg.node(),
        nodeSelection: node,
        nodeBackgroundSelection: nodeBackground,
    };
}

function addSVGTextBackgrounds(
    node: Selection<
        SVGGElement | SVGTextElement,
        ExpandedItemNode,
        SVGGElement,
        undefined
    >,
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
