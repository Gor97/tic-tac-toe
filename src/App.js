import React, { useState } from "react";
import Game from "./components/Game";
import "./App.css";

function App() {
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);
    return (
        <div className="appWrapper">
            
            <Game
                setWinner={setWinner}
                setXIsNext={setXIsNext}
                xIsNext={xIsNext}
                winner={winner}
            />
            <br/>
            {!winner && (
                <p>
                    <strong>Current Player: </strong> {xIsNext ? "X" : "O"}
                </p>
            )}
            {winner && (
                <p>
                    <strong>Winner: </strong> {winner}
                </p>
            )}
        </div>
    );
}

export default App;