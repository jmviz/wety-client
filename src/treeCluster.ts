import { ClusterLayout, HierarchyNode, HierarchyPointNode } from "d3-hierarchy";

function defaultSeparation<Datum>(
    a: HierarchyPointNode<Datum>,
    b: HierarchyPointNode<Datum>,
): number {
    return a.parent === b.parent ? 1 : 2;
}

function meanX<Datum>(children: HierarchyPointNode<Datum>[]) {
    return children.reduce(meanXReduce, 0) / children.length;
}

function meanXReduce<Datum>(x: number, c: HierarchyPointNode<Datum>) {
    return x + (c.x ?? 0);
}

function maxY<Datum>(children: HierarchyPointNode<Datum>[]) {
    return 1 + children.reduce(maxYReduce, 0);
}

function maxYReduce<Datum>(y: number, c: HierarchyPointNode<Datum>) {
    return Math.max(y, c.y ?? 0);
}

function leafLeft<Datum>(node: HierarchyPointNode<Datum>) {
    let children;
    while ((children = node.children)) node = children[0];
    return node;
}

function leafRight<Datum>(node: HierarchyPointNode<Datum>) {
    let children;
    while ((children = node.children)) node = children[children.length - 1];
    return node;
}

export default function clusterLayout<Datum>(): ClusterLayout<Datum> {
    let separation = defaultSeparation,
        dx = 1,
        dy = 1,
        nodeSize = false;

    function cluster(root: HierarchyNode<Datum>): HierarchyPointNode<Datum> {
        let previousNode: HierarchyPointNode<Datum> | null,
            x = 0;

        const pointRoot = root as HierarchyPointNode<Datum>;

        // First walk, computing the initial x & y values.
        pointRoot.eachAfter(function (node) {
            const children = node.children;
            if (children) {
                node.x = meanX(children);
                node.y = maxY(children);
            } else {
                node.x = previousNode
                    ? (x += separation(node, previousNode))
                    : 0;
                node.y = 0;
                previousNode = node;
            }
        });

        const left = leafLeft(pointRoot),
            right = leafRight(pointRoot),
            x0 = (left.x ?? 0) - separation(left, right) / 2,
            x1 = (right.x ?? 0) + separation(right, left) / 2;

        // Second walk, normalizing x & y to the desired size.
        return pointRoot.eachAfter(
            nodeSize
                ? function (node) {
                      node.x = ((node.x ?? 0) - (pointRoot.x ?? 0)) * dx;
                      node.y = ((pointRoot.y ?? 0) - (node.y ?? 0)) * dy;
                  }
                : function (node) {
                      node.x = (((node.x ?? 0) - x0) / (x1 - x0)) * dx;
                      node.y =
                          (1 - (pointRoot.y ? node.y ?? 0 / pointRoot.y : 1)) *
                          dy;
                  },
        );
    }

    cluster.separation = function (
        x: <Datum>(
            a: HierarchyPointNode<Datum>,
            b: HierarchyPointNode<Datum>,
        ) => number,
    ) {
        return arguments.length ? ((separation = x), cluster) : separation;
    };

    cluster.size = function (x?: [number, number]) {
        if (arguments.length) {
            nodeSize = false;
            dx = x && x[0] !== undefined ? +x[0] : dx;
            dy = x && x[1] !== undefined ? +x[1] : dy;
            return cluster;
        } else {
            return nodeSize ? [dx, dy] : null;
        }
    };

    cluster.nodeSize = function (x?: [number, number]) {
        if (arguments.length) {
            nodeSize = true;
            dx = x && x[0] !== undefined ? +x[0] : dx;
            dy = x && x[1] !== undefined ? +x[1] : dy;
            return cluster;
        } else {
            return nodeSize ? [dx, dy] : null;
        }
    };

    return cluster as ClusterLayout<Datum>;
}
