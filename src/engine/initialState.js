import {
	BORDER_TYPES,
} from '../constants.js';

const initialState = {
	// A catalog of all possible cards; this is read at the beginning
	rootCardCatalog: [
		{
			id: 'a1',
			borders: [
				{ type: BORDER_TYPES.BLUE, value: 1 },
				{ type: BORDER_TYPES.YELLOW, value: 1 },
				{ type: BORDER_TYPES.BLUE, value: 2 },
				{ type: BORDER_TYPES.RED, value: 4 },
			],
		},
		{
			id: 'a2',
			borders: [
				{ type: BORDER_TYPES.YELLOW, value: 1 },
				{ type: BORDER_TYPES.GREEN, value: 1 },
				{ type: BORDER_TYPES.BLUE, value: 1 },
				{ type: BORDER_TYPES.GREEN, value: 2 },
			],
		},
		{
			id: 'a3',
			borders: [
				{ type: BORDER_TYPES.BLUE, value: 1 },
				{ type: BORDER_TYPES.YELLOW, value: 1 },
				{ type: BORDER_TYPES.GREEN, value: 0 },
				{ type: BORDER_TYPES.YELLOW, value: 1 },
			],
		},
		{
			id: 'a4',
			borders: [
				{ type: BORDER_TYPES.GREEN, value: 1 },
				{ type: BORDER_TYPES.RED, value: 2 },
				{ type: BORDER_TYPES.YELLOW, value: 0 },
				{ type: BORDER_TYPES.RED, value: 0 },
			],
		},
		{
			id: 'a5',
			borders: [
				{ type: BORDER_TYPES.RED, value: 1 },
				{ type: BORDER_TYPES.BLUE, value: 1 },
				{ type: BORDER_TYPES.RED, value: 1 },
				{ type: BORDER_TYPES.YELLOW, value: 2 },
			],
		},
		{
			id: 'a6',
			borders: [
				{ type: BORDER_TYPES.RED, value: 2 },
				{ type: BORDER_TYPES.BLUE, value: 0 },
				{ type: BORDER_TYPES.RED, value: 2 },
				{ type: BORDER_TYPES.BLUE, value: 1 },
			],
		},
		{
			id: 'a7',
			borders: [
				{ type: BORDER_TYPES.GREEN, value: 2 },
				{ type: BORDER_TYPES.YELLOW, value: 0 },
				{ type: BORDER_TYPES.BLUE, value: 2 },
				{ type: BORDER_TYPES.RED, value: 1 },
			],
		},
		{
			id: 'a8',
			borders: [
				{ type: BORDER_TYPES.RED, value: 1 },
				{ type: BORDER_TYPES.YELLOW, value: 1 },
				{ type: BORDER_TYPES.BLUE, value: 1 },
				{ type: BORDER_TYPES.YELLOW, value: 2 },
			],
		},												
	],

	// the cards that the player owns
	cardPool: [
		'a1','a1','a1','a2','a2','a2','a2',
		'a2','a2','a2','a2','a2','a3','a3',
		'a3','a4','a4','a4','a4','a5','a5',
		'a5','a5','a5','a6','a6','a6','a7',
		'a8','a8','a8','a8','a8','a8','a8',
	],

	// cards currently in the player's hand; could be rotated
	// should be populated by strings like the ones in cardPool
	// cards go from the card pool to the hand
	// they could be rotated; initially they won't
	// this should be populated with objects that look like this:
	// { cardId: 'a1', rotation: ROTATION.NORTH_ABOVE }
	cardsInHand: [],

	// cards in board; could be rotated
	// this should be populated with objects that look like this:
	// { cardId: 'a1', rotation: ROTATION.NORTH_ABOVE, coords }
	// cards go from the hand to the board
	cardsInBoard: [],

	// cards that have been placed on the board during this game
	// this cannot be greater than MAX_TURNS_PER_GAME
	turnsThisGame: 0,

	currentGamePoints: 0,

	// whether a card is currently selected to be placed, and which one
	// defaults to -1; valid values: 0...(size of hand - 1)
	selectedCardInHand: -1,
};

export default initialState;