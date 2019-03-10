import { Client } from 'boardgame.io/react';
import Quadra from './engine/Quadra';
import QuadraBoard from './components/QuadraBoard/';

const App = Client({
    game: Quadra,
    board: QuadraBoard,
    numPlayers: 1,
});

export default App;