import IHeapItem from "./IHeapItem";

function Compare(x: number, y: number) {
  return x > y ? 1 : x === y ? 0 : -1;
}

class Node implements IHeapItem<Node> {
  public x: number;
  public y: number;
  public isBlocked: boolean = false;
  public speciality: string = "";
  public parent?: Node;
  public type: string = "NONE";
  public h: number = 0;
  public g: number = 0;
  heapIndex: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public get fCost(): number {
    return this.h + this.g;
  }

  public get HeapIndex(): number {
    return this.heapIndex;
  }

  public set HeapIndex(value: number) {
    this.heapIndex = value;
  }

  public CompareTo(nodeToCompare: Node): number {
    let compare: number = Compare(this.fCost, nodeToCompare.fCost);
    if (compare === 0) {
      compare = Compare(this.h, nodeToCompare.h);
    }
    return -compare;
  }
}

export default Node;

// getNeighbour(Data: Array<Array<Node>>) {
//   let neighbours: Node[] = [];
//   let chances: any = [
//     [-1, -1],
//     [-1, 0],
//     [-1, 1],
//     [0, -1],
//     [0, 1],
//     [1, -1],
//     [1, 0],
//     [1, 1],
//   ];
//   chances.forEach((chance: number[]) => {
//     Data[this.y + chance[0]] &&
//       Data[this.y + chance[0]][this.x + chance[1]] &&
//       neighbours.push(Data[this.y + chance[0]][this.x + chance[1]]);
//   });

//   return neighbours;
// }

// getF(START_NODE: Node, END_NODE: Node) {
//   let START_COST;
//   let START_xDisplacement: number = Math.abs(this.x - START_NODE.x);
//   let START_yDisplacement: number = Math.abs(this.y - START_NODE.y);
//   if (START_xDisplacement > START_yDisplacement) {
//     START_COST =
//       START_yDisplacement * 7 +
//       (START_xDisplacement - START_yDisplacement) * 5;
//   } else {
//     START_COST =
//       START_xDisplacement * 7 +
//       (START_yDisplacement - START_xDisplacement) * 5;
//   }

//   let END_COST;
//   let END_xDisplacement: number = Math.abs(this.x - END_NODE.x);
//   let END_yDisplacement: number = Math.abs(this.y - END_NODE.y);
//   if (END_xDisplacement > END_yDisplacement) {
//     END_COST =
//       END_yDisplacement * 7 + (END_xDisplacement - END_yDisplacement) * 5;
//   } else {
//     END_COST =
//       END_xDisplacement * 7 + (END_yDisplacement - END_xDisplacement) * 5;
//   }

//   let F_COST = START_COST + END_COST;
//   return F_COST;
// }
