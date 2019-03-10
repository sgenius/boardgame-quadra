import React from 'react';
import { FiClipboard } from 'react-icons/fi'

import { MAX_TURNS_PER_GAME } from '../../../../constants';
import './styles.scss';

const RemainingCardsSection = props => {
	const numTurns = props.ctx.turn || 0;
	const gameIsOver = typeof props.ctx.gameover !== 'undefined';
	const gameOverDiv = gameIsOver ? (
		<div className="game-over-text">
			<strong>Game over!</strong>
		</div>
	) : null;
	const remainingTurns = gameIsOver ? 0 : MAX_TURNS_PER_GAME - numTurns;
	return (
		<section className="remaining-cards">
			<div className="remaining-cards-text">
				<FiClipboard /> &times; {props.G.cardPool.length}
			</div>
			<div className="remaining-turns-text">
				Turns remaining &times; {remainingTurns}
			</div>
			<div className="points-text">
				Points: <strong>{props.G.currentGamePoints}</strong>
			</div>
			{gameOverDiv}
		</section>
	);
};

export default RemainingCardsSection;