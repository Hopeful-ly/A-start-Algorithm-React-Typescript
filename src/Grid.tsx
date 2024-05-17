import Node from "./Node";

class Grid {
  public gridSizeX: number;
  public gridSizeY: number;
  public grid: Array<Array<Node>> = [];

  constructor(x: number, y: number) {
    this.gridSizeX = x;
    this.gridSizeY = y;

    this.createGrid();
  }

  setBlock(x: number, y: number) {
    this.grid[x][y].isBlocked = !this.grid[x][y].isBlocked;
    this.grid[x][y].type = "NONE";
  }

  public drawPath(path: Node[]): void {
    if (path) {
      for (let x = 0; x < path.length; x++) {
        let Node: Node = path[x];
        this.grid[Node.x][Node.y].type = "PATH";
      }
    }
  }

  public getNeighbours(node: Node) {
    let neighbours = new Array<Node>();

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) {
          continue;
        }

        let checkX: number = node.x + x;
        let checkY: number = node.y + y;

        if (
          checkX >= 0 &&
          checkX < this.gridSizeX &&
          checkY >= 0 &&
          checkY < this.gridSizeY
        ) {
          neighbours.push(this.grid[checkX][checkY]);
        }
      }
    }
    return neighbours;
  }

  public getNode(x: number, y: number) {
    return this.grid[x][y];
  }

  createGrid() {
    for (let x = 0; x < this.gridSizeX; x++) {
      this.grid[x] = new Array<Node>(this.gridSizeY);
      for (let y = 0; y < this.gridSizeY; y++) {
        this.grid[x][y] = new Node(x, y);
      }
    }
  }

  public get MaxSize(): number {
    return this.gridSizeX * this.gridSizeY;
  }
}

export default Grid;
