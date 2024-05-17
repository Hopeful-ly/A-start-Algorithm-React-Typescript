import { useEffect, useState } from "react";
import {
  GridNode,
  PathNode,
  createGridNode,
  generateGrid,
} from "./library/Grid";
import { produce } from "immer";
import { findPath } from "./library/Pathfinding";
import clsx from "clsx";

function generateRandomNumber(max: number, not: number = -1) {
  let random = Math.floor(Math.random() * max);
  while (random === not) {
    random = Math.floor(Math.random() * max);
  }
  return random;
}

export default function App() {
  const [dimensions] = useState([50, 50]);

  const [startNode, _setStartNode] = useState<GridNode>(
    createGridNode(
      generateRandomNumber(dimensions[0]),
      generateRandomNumber(dimensions[1]),
    ),
  );

  const [endNode, _setEndNode] = useState<GridNode>(
    createGridNode(
      generateRandomNumber(dimensions[0], startNode.x),
      generateRandomNumber(dimensions[1], startNode.y),
    ),
  );

  const [grid, setGrid] = useState<GridNode[][]>(
    generateGrid(dimensions[0], dimensions[1]),
  );

  const [isHolding, setIsHolding] = useState(false);

  const [path, setPath] = useState<PathNode[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const path = findPath(grid, startNode, endNode);
      setPath(path);
    }, 200);

    return () => clearTimeout(timeout);
  }, [grid, startNode, endNode]);

  return (
    <div className="w-screen h-screen bg-gray-900">
      <div className="flex justify-center items-center h-full">
        <div className=" border-2 border-gray-500 inline-block">
          <div
            className="grid grid-cols-[50]  w-full h-full"
            style={{
              gridTemplateColumns: `repeat(${dimensions[0]}, 1fr)`,
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((node, nodeIndex) => (
                <div
                  key={`${nodeIndex}-${rowIndex}`}
                  className={clsx(
                    "w-3 h-3 transition-colors inline-block border border-gray-700",

                    node.wall && "bg-gray-500",
                    startNode.x === node.x && startNode.y === node.y
                      ? "bg-green-500"
                      : endNode.x === node.x && endNode.y === node.y
                        ? "bg-red-500"
                        : path.some(
                            (pathNode) =>
                              pathNode.x === node.x && pathNode.y === node.y,
                          ) && "bg-blue-500",
                  )}
                  onMouseDown={() => {
                    setIsHolding(true);
                    setGrid(
                      produce((draft) => {
                        draft[node.x][node.y].wall = true;
                      }),
                    );
                  }}
                  onMouseUp={() => setIsHolding(false)}
                  onMouseEnter={() => {
                    if (isHolding) {
                      setGrid(
                        produce((draft) => {
                          draft[node.x][node.y].wall = true;
                        }),
                      );
                    }
                  }}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
