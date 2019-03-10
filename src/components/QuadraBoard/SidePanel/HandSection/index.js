import React from 'react';
import { IoIosGrid } from 'react-icons/io';

import HandSelectableCard from './HandSelectableCard';

import { MAX_TURNS_PER_GAME } from '../../../../constants';
import './styles.scss';

const HandSection = props => {
	const handCards = props.G.cardsInHand.map((cardObj, index) => {
		let cihInner;
		if (!cardObj) {
			cihInner = null;
		} else {
			const { cardId = '' } = cardObj;
			cihInner = !cardId
				? null
				: (
					<HandSelectableCard
						{...props}
						handIndex={index}
					/>
				);		
		}
		return (
			<div key={`cih-${index}`} className="card-in-hand">
				{cihInner}
			</div>
		);
	});
	let nextInHand = MAX_TURNS_PER_GAME - props.G.cardsInBoard.length - props.G.cardsInHand.length;
	if (nextInHand < 0) {
		nextInHand = 0;
	}
	const nihIcons = new Array(nextInHand).fill((<span><IoIosGrid/></span>));
	return (
		<section className="hand">
			{handCards}
			<div className="next-in-hand-icons">
				{nihIcons}
			</div>
		</section>
	);
}


export default HandSection;