import React from 'react';
import BoardPanel from './BoardPanel/';
import SidePanel from './SidePanel';

import './styles.scss';

const QuadraBoard = props => (
    <div className="app">
        <div className="quadra-board">
            <BoardPanel {...props} />
            <SidePanel {...props} />
        </div>
    </div>
);

export default QuadraBoard;