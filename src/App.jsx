import { useState } from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [startingPlayer, setStartingPlayer] = useState("X");
  const [isXTurn, setIsXTurn] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line || [];
  const isDraw = !winner && squares.every((square) => square !== null);

  function handleClick(index) {
    if (squares[index] || winner) return;

    const nextSquares = [...squares];
    nextSquares[index] = isXTurn ? "X" : "O";

    setSquares(nextSquares);

    const newWinnerInfo = calculateWinner(nextSquares);

    if (newWinnerInfo) {
      setScore((prevScore) => ({
        ...prevScore,
        [newWinnerInfo.winner]: prevScore[newWinnerInfo.winner] + 1,
      }));
    } else {
      setIsXTurn(!isXTurn);
    }
  }

  function restartGame() {
    const nextStarter = startingPlayer === "X" ? "O" : "X";
    setStartingPlayer(nextStarter);
    setSquares(Array(9).fill(null));
    setIsXTurn(nextStarter === "X");
  }

  function resetScore() {
    setScore({ X: 0, O: 0 });
    setStartingPlayer("X");
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
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
              className={`square ${value ? "filled" : ""} ${
                winningLine.includes(index) ? "winner-square" : ""
              }`}
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
      return {
        winner: squares[a],
        line: line,
      };
    }
  }

  return null;
}

export default App;