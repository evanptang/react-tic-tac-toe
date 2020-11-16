import React from 'react';
import './App.css';

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

const Board = () => {
  const [pos, setPos] = React.useState(
    {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  );

  const [status, setStatus] = React.useState(
    'Next player: ' + (pos.xIsNext ? 'X' : 'O')
  );


  const handleClick = (i) => {
    if (calculateWinner(pos.squares) || pos.squares[i]) {
      return;
    }
    const squares = pos.squares.slice();
    squares[i] = pos.xIsNext ? 'X' : 'O';
    setPos({
      squares: squares,
      xIsNext: !pos.xIsNext
    });
  };

  const renderSquare = i => {
    return (
      <Square 
        value={pos.squares[i]}
        onClick={()=>handleClick(i)}
      />
    );
  };


  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };


  React.useEffect(() => {
    const winner = calculateWinner(pos.squares);
    if (winner) {
      setStatus('Winner: ' + winner);
    } else {
      setStatus('Next player: ' + (pos.xIsNext ? 'X' : 'O'));
    }
  }, [pos.squares, pos.xIsNext]);

  return (
    <div>
      <div className="status">{status}</div>
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

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
