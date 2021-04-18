import React, { ReactElement } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Node from "./Node";
import Grid from "./Grid";
import PathFinding from "./PathFinding";
var grid = new Grid(40, 40);
var cords: cord = {
  start: {
    x: 2,
    y: 2,
  },
  end: {
    x: 17,
    y: 15,
  },
};

interface point {
  x: number;
  y: number;
}
interface cord {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

function App(): ReactElement {
  const [display, setDisplay] = useState(<></>);
  const costView = useState(false);
  // const [distance, setDistance] = useState(0);

  const Algorithm = new PathFinding();
  useEffect(() => {
    grid.grid[cords.start.x][cords.start.y].speciality = "START";
    grid.grid[cords.end.x][cords.end.y].speciality = "END";
  }, []);

  const Start = (): void => {
    let Path: Node[] = Algorithm.FindPath(
      cords.start.x,
      cords.start.y,
      cords.end.x,
      cords.end.y,
      grid
    );
    if (Path.length !== 0) {
      grid.drawPath(Path);
      // let distance = Algorithm.getPathDist(Path);
      setDis();
      return;
      // setDistance(distance);
    }
    console.error("Path Not Found!");
    setDis();
  };

  const Block = (x: number, y: number): void => {
    if (
      (x === cords.start.x && y === cords.start.y) ||
      (x === cords.end.x && y === cords.end.y)
    )
      return;
    grid.setBlock(x, y);
    Start();
  };

  const setStart = (x: number, y: number): void => {
    grid.grid[cords.start.x][cords.start.y].speciality = "";
    grid.grid[x][y].speciality = "START";
    cords = {
      end: { x: cords.end.x, y: cords.end.y },
      start: { x: x, y: y },
    };
    Start();
  };

  const setEnd = (x: number, y: number): void => {
    grid.grid[cords.end.x][cords.end.y].speciality = "";
    grid.grid[x][y].speciality = "END";
    cords = {
      start: { x: cords.start.x, y: cords.start.y },
      end: { x: x, y: y },
    };
    Start();
  };
  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const Reset = (): void => {
    grid = new Grid(40, 40);
    let a: point = cords.start;
    let b: point = cords.end;
    grid.grid[a.x][a.y].speciality = "START";
    grid.grid[b.x][b.y].speciality = "END";
    setDis();
  };

  const setDis = (): void => {
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
                    onClick={(e) => {
                      e.ctrlKey
                        ? setStart(Node.x, Node.y)
                        : e.altKey
                        ? setEnd(Node.x, Node.y)
                        : e.shiftKey
                        ? Start()
                        : e.metaKey
                        ? Reset()
                        : Block(Node.x, Node.y);
                    }}
                    onDoubleClick={() => {}}
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
      <div className="container">
        <div className="columns">
          <div className="column is-4">
            <div className="vertCent">
              <span>
                <p onClick={Start}>
                  PathFind: <code>Shift + Click</code>
                </p>
                <p onClick={Reset}>
                  Reset: <code>Win + Click</code>
                </p>
                <p
                  onClick={() => {
                    let loop: boolean = true;
                    while (loop) {
                      let x: number = getRandomInt(1, 39);
                      let y: number = getRandomInt(0, 39);
                      if (
                        (x === cords.start.x && y === cords.start.y) ||
                        (x === cords.end.x && y === cords.end.y)
                      )
                        continue;
                      console.log(x, y);
                      setStart(x, y);
                      loop = false;
                    }
                  }}
                >
                  Set Start: <code>Ctrl + Click</code>
                </p>
                <p
                  onClick={() => {
                    let loop: boolean = true;
                    while (loop) {
                      let x: number = getRandomInt(0, 39);
                      let y: number = getRandomInt(0, 39);
                      if (
                        (x === cords.start.x && y === cords.start.y) ||
                        (x === cords.end.x && y === cords.end.y)
                      )
                        continue;
                      console.log(x, y);
                      setEnd(x, y);
                      loop = false;
                    }
                  }}
                >
                  Set End: <code>Ctr + Click</code>
                </p>
                <p>
                  Set Barrier: <code>Click</code>
                </p>
              </span>
            </div>
          </div>
          <div className="column ">
            <table>
              <tbody>{display}</tbody>
            </table>
            <div
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontFamily: "QuickSand",
                marginTop: "20px",
              }}
            >
              <div style={{ textAlign: "center", fontSize: "15px" }}>
                flaticon made by <code>Pixel perfect</code> from{" "}
                <code>
                  <a href="https://www.flaticon.com">www.flaticon.com</a>
                </code>
              </div>
              Website By{" "}
              <code>
                <a href="https://github.com/VelterZI">VelterZi</a>
              </code>
            </div>
          </div>
        </div>
        <div className="columns"></div>
      </div>
    </>
  );
}

export default App;
