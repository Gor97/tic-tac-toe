import React, { useState } from "react";

function Scoreboard(props) {

    return (
        <div className="container">
      <h1 className="text-center mt-5">Tic Tac Toe</h1>

      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
          <div className="scoreboard">
            <div className="row">
              <div className="col-6 text-center">
                <h4>Player X</h4>
                <span className="badge badge-primary p-2" style={{ fontSize: '1.2rem' }}>
                  {props.xWonTimes}
                </span>
              </div>
              <div className="col-6 text-center">
                <h4>Player O</h4>
                <span className="badge badge-primary p-2" style={{ fontSize: '1.2rem' }}>
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