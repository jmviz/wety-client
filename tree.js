let treeData = {};
let treeResizeTimeoutId;
const ety = document.getElementById('ety');
const tooltip = d3.select("#tooltip").style("opacity", 0);

window.addEventListener("resize", resizeTree);

function resizeTree() {
    clearTimeout(treeResizeTimeoutId);
    treeResizeTimeoutId = setTimeout(displayTree, 500);
}

async function getHeadProgenitorTree() {
    try {
        const response = await fetch(`${api}headProgenitorTree/${termSelectedId}/filter/${langSelectedId}`);
        treeData = await response.json();
        console.log(treeData);
        displayTree();

    } catch (error) {
        console.error(error);
    }
}

function displayTree() {
    if (Object.keys(treeData).length > 0) {
        let tree = Tree(treeData, {
            width: ety.clientWidth,
            label: d => d.item.term,
            children: d => d.children,
            link: d => d.item.url,
            tree: d3.cluster,
        });
        tree.setAttribute("id", "tree");
        ety.innerHTML = '';
        ety.appendChild(tree);
    }
}

// This function is an adaption. Original copyright notice:
//
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/tree
function Tree(data, { // data is either tabular (array of objects) or hierarchy (nested objects)
    children, // if hierarchical data, given a d in data, returns its children
    tree = d3.tree, // layout algorithm (typically d3.tree or d3.cluster)
    sort, // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
    label, // given a node d, returns the display name
    title, // given a node d, returns its hover text
    link, // given a node d, its link (if any)
    linkTarget = "_blank", // the target attribute for links (if any)
    width = 640, // outer width, in pixels
    height, // outer height, in pixels
    r = 3, // radius of nodes
    padding = 1, // horizontal padding for first and last column
    fill = "#999", // fill for nodes
    fillOpacity, // fill opacity for nodes
    stroke = "#555", // stroke for links
    strokeWidth = 1.5, // stroke width for links
    strokeOpacity = 0.4, // stroke opacity for links
    strokeLinejoin, // stroke line join for links
    strokeLinecap, // stroke line cap for links
    halo = "#fff", // color of label halo 
    haloWidth = 3, // padding around the labels
    curve = d3.curveBumpX, // curve for the link
} = {}) {

    // https://github.com/d3/d3-hierarchy#hierarchy
    const root = d3.hierarchy(data, children);

    root
        .sum(function (d) { return d.value; })
        .sort(function (a, b) { return b.height - a.height });
    // .sort(function(a, b) { return b.height - a.height || f(a,b) });

    // Compute the layout.
    const dx = 20;
    const dy = width / (root.height + padding);
    tree().nodeSize([dx, dy])(root);

    // Center the tree.
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });

    // Compute the default height.
    if (height === undefined) height = x1 - x0 + dx * 2;

    // Use the required curve
    if (typeof curve !== "function") throw new Error(`Unsupported curve`);

    const svg = d3.create("svg")
        .attr("version", "1.1")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
        .attr("viewBox", [-dy * padding / 2, x0 - dx, width, height])
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
        .data(root.links())
        .join("path")
        .attr("d", d3.link(curve)
            .x(d => d.y)
            .y(d => d.x));

    const node = svg.append("g")
        .selectAll("a")
        .data(root.descendants())
        .join("a")
        .attr("xlink:href", link == null ? null : d => link(d.data, d))
        .attr("target", link == null ? null : linkTarget)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("class", "tooltipped");

    // node.append("circle")
    //     .attr("fill", d => d.children ? stroke : fill)
    //     .attr("r", r);

    // if (title != null) node.append("title")
    //     .text(d => title(d.data, d));

    // if (L) node.append("text")
    //     .attr("dy", "0.32em")
    //     .attr("x", d => d.children ? -6 : 6)
    //     .attr("text-anchor", d => d.children ? "end" : "start")
    //     .attr("paint-order", "stroke")
    //     .attr("stroke", halo)
    //     .attr("stroke-width", haloWidth)
    //     .text((d, i) => L[i]);

    const text = node.append("text")
        .attr("x", d => d.children ? -6 : 6)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .attr("paint-order", "stroke")
        .attr("stroke", halo)
        .attr("stroke-width", haloWidth)

    text.append("tspan")
        .attr("class", "tree-node-lang")
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .attr("dy", "-0.25em")
        .text(d => d.data.item.lang)

    text.append("tspan")
        .attr("class", "tree-node-term")
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
        .text(d => d.data.item.term)

    // node
    //     .append("foreignObject")
    //     .attr("x", -50)
    //     .attr("y", 20)
    //     .attr("width", 100)
    //     .attr("height", 20)
    //     .attr("class", "tooltip-container")
    //     .append("xhtml:div")
    //     .attr("class", "tooltip")
    //     .attr("style", "background-color: #555; color: #fff; text-align: center; border-radius: 6px; padding: 5px;")
    //     .html(d => tooltip(d.data, d))

    node.on("mouseover", function (e, d) { showTooltip(e, d, this) })

    node.on("mouseout", function (e, d) { hideTooltip(e, d, this) })

    return svg.node();
}

function showTooltip(event, selection, element) {
    const item = selection.data.item;
    // d3.select(element).transition()
    //     .duration('50')
    //     .attr('opacity', '.85');
    tooltip.transition()
        .duration(50)
        .style("opacity", 1)
    tooltip
        .html(item.lang)
        .style("left", (event.clientX + 10) + "px")
        .style("top", (event.clientY - 15) + "px");

}

function hideTooltip(event, selection, element) {
    // d3.select(element).transition()
    //     .duration('50')
    //     .attr('opacity', '1');
    tooltip.transition()
        .duration('50')
        .style("opacity", 0);

}