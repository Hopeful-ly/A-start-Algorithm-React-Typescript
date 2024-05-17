import Heap from "heap-js";
import { GridNode, PathNode, createPathNode } from "./Grid";

function getNeighbours(grid: GridNode[][], node: GridNode) {
  const neighbours = [];
  const { x, y } = node;
  if (y > 0) {
    neighbours.push(createPathNode(grid[x][y - 1]));
  }
  if (y < grid[0].length - 1) {
    neighbours.push(createPathNode(grid[x][y + 1]));
  }
  if (x > 0) {
    neighbours.push(createPathNode(grid[x - 1][y]));
  }
  if (x < grid.length - 1) {
    neighbours.push(createPathNode(grid[x + 1][y]));
  }
  return neighbours;
}

export function findPath(
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode,
) {
  const openHeap = new Heap<PathNode>((a, b) => {
    let compare = b.f - a.f;
    if (compare === 0) {
      compare = b.h - a.h;
    }
    return -compare;
  });

  const closedList: PathNode[] = [];

  const start = createPathNode(createPathNode(startNode));
  const end = createPathNode(endNode);

  openHeap.push(start);
  while (openHeap.size() > 0) {
    const currentNode = openHeap.pop() as PathNode;

    closedList.push(currentNode);

    if (currentNode.x === end.x && currentNode.y === end.y) {
      const path = [];
      console.log("GOT TO THE END!", currentNode);
      let current: PathNode | null = currentNode;
      while (current) {
        path.push(current);
        current = current.parent;
      }
      return path.reverse();
    }
    const neighbors = getNeighbours(grid, currentNode);
    for (const neighbour of neighbors) {
      if (
        neighbour.wall ||
        closedList.find(
          (node) => node.x === neighbour.x && node.y === neighbour.y,
        )
      ) {
        continue;
      }
      const gScore = currentNode.g + 1;
      const beenVisited = openHeap.contains(
        neighbour,
        (a, b) => a.x === b.x && a.y === b.y,
      );
      if (!beenVisited || gScore < neighbour.g) {
        neighbour.g = gScore;
        neighbour.h =
          Math.abs(neighbour.x - end.x) + Math.abs(neighbour.y - end.y);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.parent = currentNode;
        if (!beenVisited) {
          openHeap.push(neighbour);
        }
      }
    }
  }
  return [];
}
