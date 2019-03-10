import React, { Component } from 'react';

import Card from '../../../Card';

import './styles.scss';

class HandSelectableCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animate: false,
		}
	}
	handleClick(e, obj) {
		obj.props.moves.selectCard(obj.props.handIndex);
	}

	handleRightClick(e, obj) {
		e.preventDefault();
		obj.props.moves.rotateCard(obj.props.handIndex);
		this.setState({
			animate: true,
		});
	}

	render() {
		const { handIndex } = this.props;
		const { 
			rootCardCatalog,
			cardsInHand,
			selectedCardInHand,
		} = this.props.G;
		const {
			animate,
		} = this.state;
		const {
			cardId,
			rotation,
		} = cardsInHand[handIndex];
		const isSelected = handIndex === selectedCardInHand ? 'sh-is-selected' : '';
		return (
			<button
				className={`selectable-hand ${isSelected}`}
				onClick={e => this.handleClick(e, this)}
				onContextMenu={e => this.handleRightClick(e, this)}
			>
				<Card
					rootCardCatalog={rootCardCatalog}
					cardId={cardId}
					rotation={rotation}
					animate={animate}
				/>
			</button>
		);
	};
};

export default HandSelectableCard;