import { useState } from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  function handleClick(index) {
    if (squares[index] || winner) return;

    const nextSquares = [...squares];
    nextSquares[index] = isXTurn ? "X" : "O";

    setSquares(nextSquares);
    setIsXTurn(!isXTurn);

    const newWinner = calculateWinner(nextSquares);

    if (newWinner) {
      setScore((prevScore) => ({
        ...prevScore,
        [newWinner]: prevScore[newWinner] + 1,
      }));
    }
  }

  function restartGame() {
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
  }

  function resetScore() {
    setScore({ X: 0, O: 0 });
    restartGame();
  }

  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a Draw!";
  } else {
    status = `Turn: ${isXTurn ? "X" : "O"}`;
  }

  return (
    <main className="app">
      <div className="game-card">
        <h1>Tic-Tac-Toe</h1>

        <div className="score-board">
          <div>
            <span>Player X</span>
            <strong>{score.X}</strong>
          </div>
          <div>
            <span>Player O</span>
            <strong>{score.O}</strong>
          </div>
        </div>

        <h2 className="status">{status}</h2>

        <div className="board">
          {squares.map((value, index) => (
            <button
              key={index}
              className={`square ${value ? "filled" : ""}`}
              onClick={() => handleClick(index)}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="buttons">
          <button onClick={restartGame}>Restart Game</button>
          <button onClick={resetScore}>Reset Score</button>
        </div>
      </div>
    </main>
  );
}

function calculateWinner(squares) {
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

  for (let line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default App;