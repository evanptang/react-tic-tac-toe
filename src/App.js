import React from 'react';
import './App.css';

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


const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

const Board = (props) => {

  const renderSquare = i => {
    return (
      <Square 
        value={props.position.squares[i]}
        onClick={()=>props.click(i)}
      />
    );
  };

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

const Game = () => {
  const [stored, setStored] = React.useState(
    {
      history: [{squares: Array(9).fill(null)}],
      xIsNext: true,
      stepNumber: 0,
    }
  );

  const [status, setStatus] = React.useState(
    'Next player: ' + (stored.xIsNext ? 'X' : 'O')
  );

  const [moves, setMoves] = React.useState();

  const handleClick = (i) => {
    const history = stored.history.slice(0, stored.stepNumber + 1);
    const current = history[history.length-1]
    const squares = current.squares.slice();
    if (calculateWinner(current.squares) || current.squares[i]) {
      return;
    }
    squares[i] = stored.xIsNext ? 'X' : 'O';

    setStored({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !stored.xIsNext,
      stepNumber: stored.history.length,
    });
  };


  React.useEffect(() => {
      const current = stored.history[stored.stepNumber];
      const winner = calculateWinner(current.squares);
      if (winner) {
        setStatus('Winner: ' + winner);
      } else {
        setStatus('Next player: ' + (stored.xIsNext ? 'X' : 'O'));
      }
      setMoves(
        stored.history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
          return (
            <li key={move}>
              <button onClick={
                () => setStored({
                  history: stored.history.slice(0, move + 1),
                  xIsNext: (move % 2) === 0,
                  stepNumber: move})}>
                {desc}
              </button>
            </li>
          );
        })
      )
    }, [stored.history, stored.stepNumber, stored.xIsNext]
  );


  return (
    <div className="game">
      <div className="game-board">
        <Board 
          position={stored.history[stored.stepNumber]}
          click={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
