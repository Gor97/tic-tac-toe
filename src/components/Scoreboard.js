import React, { useState } from "react";
import "./Scoreboard.css";

function Scoreboard(props) {

    return (
        <div className="container">
      <h1 className="text-center mt-5 game-title">Tic Tac Toe</h1>

      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
          <div className="scoreboard">
            <div className="row">
              <div className="col-6 text-center player-score">
                <h4 className="player-name">Player X</h4>
                <span className="score-badge x-score">
                  {props.xWonTimes}
                </span>
              </div>
              <div className="col-6 text-center player-score">
                <h4 className="player-name">Player O</h4>
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