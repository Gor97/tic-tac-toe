import React, { useState } from "react";
import "./Scoreboard.css";

function Scoreboard(props) {
    const [editingX, setEditingX] = useState(false);
    const [editingO, setEditingO] = useState(false);

    const handleNameSubmit = (player, event) => {
        event.preventDefault();
        if (player === 'X') {
            setEditingX(false);
        } else {
            setEditingO(false);
        }
    };

    const handleNameChange = (player, event) => {
        const newName = event.target.value;
        if (player === 'X') {
            props.setPlayerX(newName);
        } else {
            props.setPlayerO(newName);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5 game-title">Tic Tac Toe</h1>

            <div className="row mt-4">
                <div className="col-md-8 offset-md-2">
                    <div className="scoreboard">
                        <div className="row">
                            <div className="col-6 text-center player-score">
                                {editingX ? (
                                    <form onSubmit={(e) => handleNameSubmit('X', e)}>
                                        <input
                                            type="text"
                                            className="player-name-input"
                                            value={props.playerX}
                                            onChange={(e) => handleNameChange('X', e)}
                                            onBlur={() => setEditingX(false)}
                                            autoFocus
                                            maxLength={15}
                                        />
                                    </form>
                                ) : (
                                    <h4 className="player-name" onClick={() => !props.winner && setEditingX(true)}>
                                        {props.playerX}
                                    </h4>
                                )}
                                <span className="score-badge x-score">
                                    {props.xWonTimes}
                                </span>
                            </div>
                            <div className="col-6 text-center player-score">
                                {editingO ? (
                                    <form onSubmit={(e) => handleNameSubmit('O', e)}>
                                        <input
                                            type="text"
                                            className="player-name-input"
                                            value={props.playerO}
                                            onChange={(e) => handleNameChange('O', e)}
                                            onBlur={() => setEditingO(false)}
                                            autoFocus
                                            maxLength={15}
                                        />
                                    </form>
                                ) : (
                                    <h4 className="player-name" onClick={() => !props.winner && setEditingO(true)}>
                                        {props.playerO}
                                    </h4>
                                )}
                                <span className="score-badge o-score">
                                    {props.oWonTimes}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Scoreboard;