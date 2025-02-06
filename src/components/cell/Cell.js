import React from "react";
import "./Cell.css";
import xImage from '../../x.png'; 
import oImage from '../../o.png';

function Cell(props) {
    let imageSrc = null;
    let imageClass = 'tic-tac-toe-image';

    if (props.value === 'X') {
      imageSrc = xImage;
      imageClass += ' x-animation';
    } else if (props.value === 'O') {
      imageSrc = oImage;
      imageClass += ' o-animation';
    }
    return (
        <div className="cellWrapper col-4 border border-dark cell" onClick={props.onClick}>
            {imageSrc && <img src={imageSrc} className={imageClass} />}
        </div>
    );
}

export default Cell;