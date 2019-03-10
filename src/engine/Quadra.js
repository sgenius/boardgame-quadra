import { shuffle } from 'lodash';
import { Game, INVALID_MOVE } from 'boardgame.io/core';

import { 
	MAX_HAND,
	MAX_TURNS_PER_GAME,
	MAX_X,
	MAX_Y,
	ROTATION,
} from '../constants'

import {
	calculateLastPlayScore,
	verifyAdjacency,
} from '../helpers';

import initialState from './initialState';

const Quadra = Game({
	name: 'Quadra',
	// initializes G, which holds the custom game state
	setup: () => {
		// shuffle the card pool, then push three cards to the hand
		const cardsInHand = [];
		const shuffledCardPool = shuffle(initialState.cardPool);

		for (let i = 0; i < 3; i += 1) {
			const cardId = shuffledCardPool.pop();
			const cardObj = {
				cardId,
				rotation: ROTATION.NORTH_ABOVE,
			};
			cardsInHand.push(cardObj);
		}

		return {
			...initialState,
			cardsInHand,
			cardPool: shuffledCardPool,
		};
	},

	// Actions possible during the game. All these are
	// functions that receive G, ctx and optional open parameters,
	// and return a new state for G.
	moves: {

		// Rotates a card in the hand, clockwise.
		rotateCard(G, ctx, cardIndex) {
			if (cardIndex < 0 || cardIndex > MAX_HAND) {
				return INVALID_MOVE;
			}

			const { cardsInHand } = G;
			const currentRotation = cardsInHand[cardIndex].rotation;

			const newRotation = currentRotation === 3 ? 0 : currentRotation + 1;

			G.cardsInHand[cardIndex].rotation = newRotation;
		},

		// Selects a card to be placed in the board.
		// If the current card was selected, it is deselected instead.
		selectCard(G, ctx, cardIndex) {
			if (cardIndex < 0 || cardIndex > MAX_HAND) {
				return INVALID_MOVE;
			}

			const { selectedCardInHand } = G;
			const newSelectedCard = cardIndex === selectedCardInHand
				? -1
				: cardIndex;

			G.selectedCardInHand = newSelectedCard;
		},

		// Moves a card from the hand to the board.
		// cardIndex is the index of the selected card in the hand,
		// so it's between 0 and 2
		// boardCoords are the {x, y} coords of the cell in the board,
		// which cannot exceed MAX_X and MAX_Y respectively
		moveCardToBoard(G, ctx, cardIndex, coordX, coordY) {
			// validation
			if (cardIndex < 0 || cardIndex > MAX_HAND) {
				return INVALID_MOVE;
			}

			const boardCoords = { x: coordX, y: coordY };

			if (boardCoords.x < 0 || boardCoords.y < 0
				|| boardCoords.x > MAX_X || boardCoords.y > MAX_Y) {
				return INVALID_MOVE;
			}

			// validate coords:
			// - if this is not the first card in the board,
			//   the position must be adjacent (up, down, left or right)
			//   to another card in the board
			if (G.cardsInBoard.length && !verifyAdjacency(boardCoords, G.cardsInBoard)) {
				return INVALID_MOVE;
			}

			// move the card from hand to board
			// const card = G.cardsInHand[cardIndex];
			// G.cardsInBoard.push({
			// 	cardId: card,
			// 	rotation: rotation,
			// 	coords: boardCoords
			// });
			G.cardsInBoard.push({
				...G.cardsInHand[cardIndex],
				coords: boardCoords,
			});


			// calculate score increase due to new card placed
			G.currentGamePoints += calculateLastPlayScore(G.cardsInBoard, G.rootCardCatalog);

			// get a new card from the card pool, except if there are too many plays
			// for now, hardcoded to check the number of moves of player 1
			const numTurns = ctx.turn;
			if (!numTurns || numTurns < MAX_TURNS_PER_GAME - 3) {
				const cardFromPool = G.cardPool.pop();
				const cardFromPoolObj = {
					cardId: cardFromPool,
					rotation: ROTATION.NORTH_ABOVE,
				};
				G.cardsInHand[cardIndex] = cardFromPoolObj;
			} else {
				G.cardsInHand[cardIndex] = null;
			}

			// clear up the indicator for selected card in the hand
			G.selectedCardInHand = -1;

			// end the turn
			ctx.events.endTurn();
		},
	},

	flow: {
		endGameIf: (G, ctx) => {
			// if (ctx.turn === MAX_TURNS_PER_GAME) {
			// 	return { finalPoints: G.currentGamePoints };
			// }
			if (G.cardsInBoard.length === MAX_TURNS_PER_GAME) {
				return { finalPoints: G.currentGamePoints };
			}
		},
	},
});

export default Quadra;