export type Grid = GridNode[][];

export function generateGrid(width: number, height: number): Grid {
  const grid = [];
  for (let x = 0; x < width; x++) {
    const row = [];
    for (let y = 0; y < height; y++) {
      row.push(createGridNode(x, y));
    }
    grid.push(row);
  }
  return grid;
}

export function createGridNode(x: number, y: number): GridNode {
  return {
    x,
    y,
    wall: false,
  };
}
export type GridNode = {
  x: number;
  y: number;
  wall: boolean;
};

export function createPathNode(gridNode: GridNode): PathNode {
  return {
    ...gridNode,
    g: 0,
    h: 0,
    f: 0,
    parent: null,
  };
}
export type PathNode = GridNode & {
  g: number;
  h: number;
  f: number;
  parent: PathNode | null;
};
