import React from 'react';
import {
	IoIosWater,
	IoIosSunny,
	IoIosLeaf,
	IoIosBonfire,
	IoMdCloud,
	IoIosMusicalNotes,
} from 'react-icons/io';

import './styles.scss';
import {
	ROTATION,
	BORDER_TYPES,
} from '../../../constants.js';

const Card = ({ rootCardCatalog, cardId, rotation = ROTATION.NORTH_ABOVE, animate = false }) => {
	if (!cardId || !cardId.length) {
		return null;
	}
	const cardAttrs = rootCardCatalog.find(card => card.id === cardId);
	const typeIcons = {
		[BORDER_TYPES.BLUE]: (<IoIosWater />),
		[BORDER_TYPES.YELLOW]: (<IoIosSunny />),
		[BORDER_TYPES.GREEN]: (<IoIosLeaf />),
		[BORDER_TYPES.RED]: (<IoIosBonfire />),
		[BORDER_TYPES.BLACK]: (<IoMdCloud />),
		[BORDER_TYPES.PURPLE]: (<IoIosMusicalNotes />),
	};

	if (!cardAttrs) {
		return null;
	}

	const borderElems = cardAttrs.borders.map((border, index) => (
		<div
			key={`cb-${index}-${Date.now()}`}
			className={`card-border card-border-order-${index} card-${border.type}`}
		>
			<div className="card-border-value">{border.value}</div>
			<div className="card-border-icon">{typeIcons[border.type]}</div>
		</div>
	));
	const animationClass = animate ? 'animate' : '';
	return (
	    <div className={`card card-rotation-${rotation} ${animationClass}`}>
	    	{borderElems}
	    </div>
	);
}

export default Card;