import { FC } from 'react';
import Square from 'components/Square';

const Board: FC<{ squares: Array<null | 'X' | 'O'>, onClick: Function }> = ({ squares, onClick }) => {
  const renderSquare = (index: number) => {
    return (
      <Square
        value={squares[index] ?? ''}
        onClick={() => onClick(index)}
      />
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default Board;
