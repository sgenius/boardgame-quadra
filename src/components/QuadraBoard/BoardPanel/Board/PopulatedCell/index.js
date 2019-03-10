import React, { Component } from 'react';
import Card from '../../../Card';

import { verifyAvailability } from '../../../../../helpers';

import './styles.scss';

class PopulatedCell extends Component {
	isAvailable() {
		const { cardsInBoard, selectedCardInHand } = this.props.G;
		const { x, y } = this.props; 
		return (selectedCardInHand !== -1 && verifyAvailability({x, y}, cardsInBoard));
	}

	handleClick(e, obj) {
		const { x, y } = obj.props;
		const { selectedCardInHand } = obj.props.G;
		const { moveCardToBoard } = obj.props.moves;
		if (obj.isAvailable()) {
			moveCardToBoard(selectedCardInHand, x, y);
		}
	}

	render() {
		const {
			card,
			x,
			y,
		} = this.props;

		const {
			cardId = '',
			rotation = 0,
		} = card;

		const {
			rootCardCatalog,
		} = this.props.G;

		const isAvailableClass = this.isAvailable() ? 'cell-available' : '';

		const innerCell = (
			<Card
				rootCardCatalog={rootCardCatalog}
				cardId={cardId}
				rotation={rotation}
			/>
		);

		return (
			<div
				className={`cell ${isAvailableClass} cell-x-${x} cell-y-${y}`}
				onClick={e => this.handleClick(e, this)}
			>
				{innerCell}
			</div>
		);
	}
};

export default PopulatedCell;