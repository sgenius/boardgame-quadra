import React from 'react';
import Board from './Board';

import './styles.scss';

const BoardPanel = props => (
	<div className="board-panel">
		<Board {...props} />
	</div>
);

export default BoardPanel;