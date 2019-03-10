import React from 'react';

import PopulatedCell from './PopulatedCell';

import './styles.scss';

const Board = props => {
    const { cardsInBoard } = props.G;

    // fill out board matrix
    const boardMatrix = new Array(5);
    for (let i = 0; i < 5; i++) {
        boardMatrix[i] = new Array(5).fill(null);
    };
    cardsInBoard.forEach(card => {
        const { x, y } = card.coords;
        boardMatrix[y][x] = card;
    });

    const trs = [];
    for (let i = 0; i < 5; i += 1) {
        const tds = [];
        for (let j = 0; j < 5; j += 1) {
            const card = boardMatrix[i][j] || {}; 
            tds.push(
                <PopulatedCell
                    {...props}
                    card={card}
                    x={j}
                    y={i}
                    key={`td-${i}-${j}`}
                />
            );
        }
        trs.push(<div key={`tr-${i}`} style={{display: 'table-row'}}>{tds}</div>);
    }

	return (
        <div className="board">
    		<div className="board-matrix" style={{display:'table'}}>
                {trs}
            </div>	
    	</div>
    );
};

export default Board;