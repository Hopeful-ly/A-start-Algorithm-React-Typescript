import Node from "./Node";
import Grid from "./Grid";
import Heap from "./Heap";

class PathFinding {
  FindPath(x1: number, y1: number, x2: number, y2: number, grid: Grid) {
    let Path: Node[] = [];
    let startNode: Node = grid.getNode(x1, y1);
    let targetNode: Node = grid.getNode(x2, y2);

    // let openSet: Node[] = [];
    let openSet: Heap<Node> = new Heap<Node>(grid.MaxSize);
    let closedSet: Node[] = [];
    openSet.push(startNode);
    startNode.type = "OPEN";

    while (openSet.length > 0) {
      // console.log("yo");
      let currentNode = openSet.RemoveFirst();
      // let currentNode = openSet[0];
      // for (let i = 1; i < openSet.length; i++) {
      //   if (openSet[i]) {
      //     if (
      //       openSet[i].h + openSet[i].g < currentNode.h + currentNode.g ||
      //       (openSet[i].h + openSet[i].g === currentNode.h + currentNode.g &&
      //         openSet[i].h < currentNode.h)
      //     ) {
      //       currentNode = openSet[i];
      //     }
      //   }
      // }
      // this.removeItem(openSet, currentNode);
      // openSet.

      closedSet.push(currentNode);
      currentNode.type = "CLOSED";

      if (currentNode === targetNode) {
        Path = this.Retrace(startNode, targetNode);
      }

      grid.getNeighbours(currentNode).forEach((neighbour: Node) => {
        if (neighbour.isBlocked || closedSet.includes(neighbour)) {
        } else {
          let newMovementCostToNeighbour =
            currentNode.g + this.GetDistance(currentNode, neighbour);
          if (
            newMovementCostToNeighbour < neighbour.g ||
            !openSet.includes(neighbour)
          ) {
            neighbour.parent = currentNode;
            neighbour.g = newMovementCostToNeighbour;
            neighbour.h = this.GetDistance(neighbour, targetNode);

            if (!openSet.includes(neighbour)) {
              neighbour.type = "OPEN";
              openSet.push(neighbour);
            } else {
              openSet.UpdateItem(neighbour);
            }
          }
        }
      });
    }
    return Path;
  }

  Retrace(startNode: Node, endNode: Node): Node[] {
    let Path = new Array<Node>();
    let currentNode = endNode;

    while (currentNode !== startNode) {
      Path.push(currentNode);
      // @ts-ignore
      currentNode = currentNode.parent;
    }

    Path.reverse();

    return Path;
  }
  public getPathDist(Path: Node[]): number {
    let distance = 0;
    let lastNodeIndex = 0;
    for (let x = 1; x < Path.length; x++) {
      distance += this.GetDistance(Path[x], Path[lastNodeIndex]);
      lastNodeIndex = x;
    }

    return distance;
  }

  removeItem<T>(arr: Array<T>, value: T): Array<T> {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  public GetDistance = (nodeA: Node, nodeB: Node) => {
    let dstX: number = Math.abs(nodeA.x - nodeB.x);
    let dstY: number = Math.abs(nodeA.y - nodeB.y);
    if (dstX > dstY) {
      return 14 * dstY + 10 * (dstX - dstY);
    }
    return 14 * dstX + 10 * (dstY - dstX);
  };
}

export default PathFinding;

// while (true) {
//     curvedData.forEach((yAxis) => {
//       yAxis.forEach((xAxis) => {
//         if (current) {
//           if (
//             this.GetDistance(xAxis, start) + this.GetDistance(xAxis, end) <
//             this.GetDistance(current, start) + this.GetDistance(current, end)
//           ) {
//             if (xAxis.type === "OPEN") {
//               current = xAxis;
//             }
//           }
//         } else {
//           current = xAxis;
//         }
//       });
//     });

//     // @ts-ignore
//     current = current;

//     if (current.isEnd) {
//       curvedData[current.y][current.x] = current;
//       break;
//     }

//     current.type = "CLOSED";

//     let neighbours: Node[] = current.getNeighbour(curvedData);
//     neighbours.forEach((neighbour) => {
//       if (neighbour.isBlocked || neighbour.type === "CLOSED") {
//       } else {
//         const newMovementToNeighbourCost =
//           this.GetDistance(start, current) +
//           this.GetDistance(current, neighbour);
//         if (
//           newMovementToNeighbourCost < this.GetDistance(start, neighbour) ||
//           neighbour.type !== "OPEN"
//         ) {
//           neighbour.g = newMovementToNeighbourCost;
//           neighbour.h = this.GetDistance(end, neighbour);
//           neighbour.parent = current;

//           if (neighbour.type !== "OPEN") {
//             neighbour.type = "OPEN";
//           }
//         }
//       }
//       curvedData[neighbour.y][neighbour.x] = neighbour;
//     });
//     curvedData[current.y][current.x] = current;
//     break;
//   }
// setData(curvedData);
