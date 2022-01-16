import { FC, MouseEventHandler } from 'react';

const Square: FC<{ onClick: MouseEventHandler, value: string }> = ({ onClick, value }) => {
  return (
    <button
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
