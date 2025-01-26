import React, { useState } from "react";
import Cell from "./Cell.js";
import "./Game.css";
import Scoreboard from "./Scoreboard.js";

    function Game(props) {
        
    const [board, setBoard] = useState([
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ]);

    const [xWonTimes, setXWonTimes] = useState(0);
    const [oWonTimes, setOWonTimes] = useState(0);

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
                if (currentSymbol === "X") setXWonTimes(xWonTimes+1) 
                    else setOWonTimes(oWonTimes+1) 
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
                if (currentSymbol === "X") setXWonTimes(xWonTimes+1) 
                    else setOWonTimes(oWonTimes+1) 
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
            if (currentSymbol === "X") setXWonTimes(xWonTimes+1) 
                else setOWonTimes(oWonTimes+1) 
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
        ]
        setBoard(newBoard);
        props.setXIsNext(true);
        props.setWinner(null);
    }

    function resetScoreboard() {
        setXWonTimes(0);
        setOWonTimes(0);
        resetBoard();
    }

    return (
        <div className="gameWrapper">
            <Scoreboard xWonTimes={xWonTimes} oWonTimes={oWonTimes}/>
            <br/>
            {board.map((row, rowIdx) => {
                return (
                    <div key={rowIdx} className="rowWrapper">
                        {row.map((col, colIdx) => {
                            return (
                                <Cell
                                   onClick={changeCellValue.bind(
                                        null,
                                        rowIdx,
                                        colIdx
                                    )}
                                    key={colIdx}
                                    value={col}
                                />
                            );
                        })}
                    </div>
                ); })}
                <div>
                <button type="button" class="resetButton btn btn-raised btn-primary" onClick={resetBoard}>Reset Current Game</button>
                <button type="button" class="resetButton btn btn-raised btn-secondary" onClick={resetScoreboard}>Reset Scoreboard</button>
                </div>
        </div>
    );
}

export default Game;