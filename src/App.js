import React, { useState } from "react";
import Game from "./components/game/Game";
import "./App.css";

function App() {
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const getStatusClass = () => {
        if (winner) return "game-status winner";
        return xIsNext ? "game-status player-x" : "game-status player-o";
    };

    const getStatusText = () => {
        if (winner === "Draw") return "Game Over - It's a Draw!";
        if (winner) return `${winner} Wins! 🎉`;
        return `${xIsNext ? "X" : "O"}'s Turn`;
    };

    return (
        <div className="appWrapper">
            <Game
                setWinner={setWinner}
                setXIsNext={setXIsNext}
                xIsNext={xIsNext}
                winner={winner}
            />
            <div className={getStatusClass()}>
                {getStatusText()}
            </div>
        </div>
    );
}

export default App;