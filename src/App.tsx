import React, { ReactElement } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Node from "./Node";
import Grid from "./Grid";
import PathFinding from "./PathFinding";
var grid = new Grid(300, 300);

function App(): ReactElement {
  const [display, setDisplay] = useState(<></>);
  const [costView, setCostView] = useState(false);
  const [cords, setCords] = useState({
    start: [2, 6],
    end: [290, 299],
  });
  const [distance, setDistance] = useState(0);

  const Algorithm = new PathFinding();
  useEffect(() => {
    grid.grid[cords.start[0]][cords.start[1]].speciality = "START";
    grid.grid[cords.end[0]][cords.end[1]].speciality = "END";
    setDis();
  }, []);

  const Start = () => {
    let Path: Node[] = Algorithm.FindPath(
      cords.start[0],
      cords.start[1],
      cords.end[0],
      cords.end[1],
      grid
    );
    grid.drawPath(Path);
    let distance = Algorithm.getPathDist(Path);
    setDistance(distance);
    setDis();
  };

  const Block = (x: number, y: number) => {
    grid.setBlock(x, y);
    Start();
  };

  const Reset = () => {
    grid = new Grid(20, 20);
    grid.grid[cords.start[0]][cords.start[1]].speciality = "START";
    grid.grid[cords.end[0]][cords.end[1]].speciality = "END";
    setDis();
  };

  const setDis = () => {
    setDisplay(
      <>
        {grid.grid.map((x: Array<Node>) => {
          return (
            <tr>
              {x.map((Node: Node) => {
                return (
                  <td
                    className={`${Node.type}  ${
                      Node.isBlocked ? "BLOCKED" : "NORMAL"
                    } ${Node.speciality}`}
                    onClick={() => {
                      Block(Node.x, Node.y);
                    }}
                  >
                    {costView && Node.g + Node.h}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </>
    );
  };
  return (
    <>
      <button onClick={Start}>Start</button>
      <button onClick={Reset}>Reset</button>
      <p>
        distance:{distance}
        {Algorithm.GetDistance(
          new Node(cords.start[0], cords.start[1]),
          new Node(cords.end[0], cords.end[1])
        )}
      </p>
      <table>
        <tbody>{display}</tbody>
      </table>
    </>
  );
}

export default App;
