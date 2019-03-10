// returns whether two pairs of coordinaes are adjacent
// either horizontally or vertically, but not diagonally
export function coordsAreAdjacent(coords1, coords2) {
	const { x: x1, y: y1 } = coords1;
	const { x: x2, y: y2 } = coords2;

	// coordinates are adjacent if:
	// - the difference in one dimension is 1
	// - the difference in the other dimension is 0

	const diffx = Math.abs(x1 - x2);
	const diffy = Math.abs(y1 - y2);
	const sum = (diffx + diffy);
	return (sum === 1);
}

// returns true if a pair of coordinates is adjacent to
// any card on the board.
export function verifyAdjacency(coords, cardsInBoard) {
	if (!cardsInBoard) {
		return false;
	}
	for (let i = cardsInBoard.length - 1; i >= 0; i--) {
		const card = cardsInBoard[i];
		if (coordsAreAdjacent(coords, card.coords)) {
			return true;
		}
	}
	return false;
}

// returns true if the cell in a pair of coordinates can
// hold a new card. This happens if:
// - the cell is adjacent to another card,
// - the cell is not occupied by a card already.
// If there are not cards in the board yet, all cells are available.
export function verifyAvailability(coords, cardsInBoard) {
	if (cardsInBoard.length === 0) {
		return true;
	}

	if (cardsInBoard.findIndex(card => card.coords === coords) !== -1) {
		return false;
	}

	return verifyAdjacency(coords, cardsInBoard);
}

function getBordersByCardId(cardId, rootCardCatalog) {
	const thisCardIndex = rootCardCatalog.findIndex(card => card.id === cardId);
	if(thisCardIndex !== -1) {
		return rootCardCatalog[thisCardIndex].borders;
	}
}

// this function uses the fact that borders are represented by the numbers 0, 1, 2, 3 clockwise,
// and the rotation is also represented by 0, 1, 2, 3 (where 0 is no rotation, 1 is 90 degrees rotation,
// etc. all clockwise).
function getRotatedBorderIndex(requestedBorder, rotation) {
	const rotatedBorder = requestedBorder - rotation;
	return (rotatedBorder < 0) ? rotatedBorder + 4 : rotatedBorder;
}

// same as above but returns the actual border objects
function getRotatedBorder(requestedBorder, borders, rotation) {
	const rotatedBorder = getRotatedBorderIndex(requestedBorder, rotation);
	if (borders.length && !Number.isNaN(rotatedBorder)) {
		return borders[rotatedBorder]
	}
	return null;
}


// calculates the score of the last play
// dummy for now
export function calculateLastPlayScore(cardsInBoard, rootCardCatalog) {
	let score = 0;
	// assume the last entry of cardsInBoard represents the last move
	const cardsInBoardLength = cardsInBoard.length;
	const lastCard = cardsInBoard[cardsInBoardLength - 1];
	const { x, y } = lastCard.coords;

	// console.log('calculateLastPlayScore > cardsInBoard: ', cardsInBoard);
	const lcBorders = getBordersByCardId(lastCard.cardId, rootCardCatalog);

	// find adjacents
	const adjacents = [
		cardsInBoard.findIndex(card => card.coords.x === x && card.coords.y === (y-1)),
		cardsInBoard.findIndex(card => card.coords.y === y && card.coords.x === (x+1)),
		cardsInBoard.findIndex(card => card.coords.x === x && card.coords.y === (y+1)),
		cardsInBoard.findIndex(card => card.coords.y === y && card.coords.x === (x-1))
	];

	for (let borderIndex = 0; borderIndex <= 3; borderIndex += 1) {

		const oppositeCardIndex = adjacents[borderIndex];
		let oppositeBorderIndex = borderIndex + 2;
		if (oppositeBorderIndex > 3) {
			oppositeBorderIndex = oppositeBorderIndex - 4;
		}
		
		if (oppositeCardIndex === -1) {
			continue;
		}

		const oppositeCard = cardsInBoard[oppositeCardIndex];
		const oppBorders = getBordersByCardId(oppositeCard.cardId, rootCardCatalog);

		// get the top border of this card, after rotation
		const localBorder = getRotatedBorder(borderIndex, lcBorders, lastCard.rotation);

		// get the bottom border of the card on top, after rotation
		const oppositeBorder = getRotatedBorder(oppositeBorderIndex, oppBorders, oppositeCard.rotation);

		if (localBorder.type === oppositeBorder.type) {
			score = score + localBorder.value + oppositeBorder.value;
		}
	}
	return score;
}