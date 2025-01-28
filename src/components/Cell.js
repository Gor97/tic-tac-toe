import React from "react";
import "./Cell.css";
import xImage from '../x.png'; // Import your X image
import oImage from '../o.png'; // Import your O image

function Cell(props) {
    let imageSrc = null;
    let imageClass = 'tic-tac-toe-image'; // Apply base class for styling

    if (props.value === 'X') {
      imageSrc = xImage;
      imageClass += ' x-animation'; // Add animation class for X
    } else if (props.value === 'O') {
      imageSrc = oImage;
      imageClass += ' o-animation'; // Add animation class for O
    }
    return (
        <div className="cellWrapper col-4 border border-dark cell" onClick={props.onClick}>
            {imageSrc && <img src={imageSrc} className={imageClass} />}
        </div>
    );
}

export default Cell;