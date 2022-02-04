import { useState } from 'react';
import party from 'party-js';

import Board from 'components/Board';

import 'App.css'

const winingCombinations = [
  [ 0, 1, 2 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ],
  [ 0, 3, 6 ],
  [ 1, 4, 7 ],
  [ 2, 5, 8 ],
  [ 0, 4, 8 ],
  [ 2, 4, 6 ]
];

const App = () => {
  const [ history, setHistory ] = useState([ { squares: Array(9).fill(null) } ]);
  const [ stepNumber, setStepNumber ] = useState(0);
  const [ xIsNext, setXIsNext ] = useState(true);

  const calculateWinner = (squares: Array<null | string>): null | string => {
    for (let i = 0; i < winingCombinations.length; i++) {
      const [ a, b, c ] = winingCombinations[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        party.confetti(party.Rect.fromScreen(), {
          count: party.variation.range(100, 200),
        })
        return squares[a];
      }
    }

    return null;
  }

  const handleClick = (i: number) => {
    const historySlice = history.slice(0, stepNumber + 1);
    const current = historySlice[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      if (window.confirm('reset')) {
        reset();
      }

      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    setHistory(historySlice.concat([ { squares } ]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
    setHistory(history.slice(0, step + 1));
  }

  const reset = () => {
    setHistory([ { squares: Array(9).fill(null) } ]);
    setStepNumber(0);
    setXIsNext(true);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className="container">
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: number) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <h3>{status}</h3>
          <ol>
            <li>
              <button onClick={reset}>Reset Game</button>
            </li>
            {moves}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
