import React, { useState, useEffect } from "react";
import Cell from "../cell/Cell.js";
import "./Game.css";
import Scoreboard from "../Scoreboard.js";
import { getScores, increment, reset } from '../../db/db.js';

function Game(props) {

  const [board, setBoard] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);

  const [scores, setScores] = useState({x: 0, o: 0});

  useEffect(() => {
    async function fetchScores() {
        const data = await getScores();
        if (data) setScores(data);
    }
    fetchScores();
}, []);

const handleIncrementX = async () => {
    const updatedScores = await increment(1,0);
    setScores(updatedScores);
};
const handleIncrementO = async () => {
  const updatedScores = await increment(0,1);
  setScores(updatedScores);
};

const handleReset = async () => {
    const updatedScores = await reset();
    setScores(updatedScores);
};


  function incremenetScore(isX) {
    if (isX) {
        handleIncrementX()
    } else {
        handleIncrementO()
    }
  }

  function checkWinner(board, rowIdx, colIdx) {
    const currentSymbol = board[rowIdx][colIdx];

    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === currentSymbol &&
        board[i][1] === currentSymbol &&
        board[i][2] === currentSymbol
      ) {
        props.setWinner(currentSymbol);
        if (currentSymbol === "X") 
            {
                incremenetScore(true)
            }
        else 
        {
            incremenetScore(false)
        }
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === currentSymbol &&
        board[1][i] === currentSymbol &&
        board[2][i] === currentSymbol
      ) {
        props.setWinner(currentSymbol);
        if (currentSymbol === "X") {
            incremenetScore(true)
        }
        else {
            incremenetScore(false)
        }
        return;
      }
    }

    // Check diagonals
    if (
      (rowIdx === colIdx &&
        board[0][0] === currentSymbol &&
        board[1][1] === currentSymbol &&
        board[2][2] === currentSymbol) ||
      (rowIdx + colIdx === 2 &&
        board[0][2] === currentSymbol &&
        board[1][1] === currentSymbol &&
        board[2][0] === currentSymbol)
    ) {
      props.setWinner(currentSymbol);
      if (currentSymbol === "X") {
        incremenetScore(true)
      } else {
        incremenetScore(false)
      }
      return;
    }

    // Check for draw
    let draw = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === " ") {
          draw = false;
          break;
        }
      }
    }

    if (draw) props.setWinner("Draw");
  }

  function changeCellValue(rowIdx, colIdx) {
    if (props.winner || board[rowIdx][colIdx] !== " ") return;
    const newBoard = board.map((row) => [...row]);
    newBoard[rowIdx][colIdx] = props.xIsNext ? "X" : "O";

    setBoard(newBoard);
    props.setXIsNext(!props.xIsNext);
    checkWinner(newBoard, rowIdx, colIdx);
  }

  function resetBoard() {
    const newBoard = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
    setBoard(newBoard);
    props.setXIsNext(true);
    props.setWinner(null);
  }

  function resetScoreboard() {
    resetBoard();
    handleReset();
  }

  return (
    <div className="gameWrapper">
      <Scoreboard xWonTimes={scores.x} oWonTimes={scores.o} />
      <br />
      {board.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="rowWrapper">
            {row.map((col, colIdx) => {
              return (
                <Cell
                  onClick={changeCellValue.bind(null, rowIdx, colIdx)}
                  key={colIdx}
                  value={col}
                />
              );
            })}
          </div>
        );
      })}
      <div>
        <button
          type="button"
          className="resetButton btn btn-raised btn-primary"
          onClick={resetBoard}
        >
          Reset Current Game
        </button>
        <button
          type="button"
          className="resetButton btn btn-raised btn-secondary"
          onClick={resetScoreboard}
        >
          Reset Scoreboard
        </button>
      </div>
    </div>
  );
}

export default Game;
