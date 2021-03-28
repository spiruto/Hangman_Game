import React, { useState } from "react";
import StartGame from "./components/start_game";
import CorrectSound from "./assets/correct.wav";
import IncorrectSound from "./assets/incorrect.wav";
const Game = (props) => {
  const [game, setGame] = useState({
    phrase: "",
    chances: 0,
    showStart: true,
    currentLetter: "",
    LettersChecked: {},
    haveWinner: false,
  });
  const correct = new Audio(CorrectSound);
  const incorrect = new Audio(IncorrectSound);
  const phraseHandler = (event) => {
    let handler = { ...game };
    handler.phrase = event.currentTarget.value;
    setGame(handler);
  };
  const start = () => {
    if (game.phrase !== "") {
      let handler = { ...game };
      let phraseLength = game.phrase.split("").length;
      handler.chances = phraseLength;
      game.phrase
        .toLowerCase()
        .split("")
        .forEach((l) => {
          handler.LettersChecked[l] = { isChecked: false };
        });
      handler.showStart = false;
      setGame(handler);
    }
  };
  const checkLetter = () => {
    if (game.currentLetter !== "") {
      let handler = { ...game };
      if (
        game.LettersChecked.hasOwnProperty(game.currentLetter.toLowerCase())
      ) {
        handler.LettersChecked[
          game.currentLetter.toLowerCase()
        ].isChecked = true;
        correct.play();
      } else {
        incorrect.play();
      }
      handler.currentLetter = "";
      handler.haveWinner = checkGameStatus();
      setGame(handler);
    }
  };
  const letterHandler = (event) => {
    let handler = { ...game };
    handler.currentLetter = event.currentTarget.value;
    setGame(handler);
  };
  const checkGameStatus = () => {
    for (let letter of Object.keys(game.LettersChecked)) {
      if (!game.LettersChecked[letter].isChecked) {
        return false;
      }
    }
    return true;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="mb-5">Hangman</h1>
          {game.showStart ? (
            <StartGame start={start} phraseHandler={phraseHandler} />
          ) : game.haveWinner ? (
            <>
              <p>We have a winner!</p>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => window.location.reload()}
              >
                Play Again
              </button>
            </>
          ) : (
            <div className="row">
              <div className="col-12 mb-5"></div>
              <div className="col-12 mb-5">
                {game.phrase
                  .toLowerCase()
                  .split("")
                  .map((l, key) => (
                    <input
                      disabled
                      className="text-center"
                      key={key}
                      placeholder="_"
                      style={{ width: "30px" }}
                      value={game.LettersChecked[l].isChecked ? l : ""}
                    />
                  ))}
              </div>
              <div className="col-12 mb-3">
                <input
                autoFocus={true}
                  onChange={letterHandler}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      checkLetter();
                    }
                  }}
                  className="text-center"
                  style={{ width: "60px" }}
                  type="text"
                  placeholder="_"
                  maxLength={1}
                  value={game.currentLetter}
                />
              </div>
              <div className="col-12">
                <button
                  type="button"
                  onClick={checkLetter}
                  className="btn btn-sm btn-warning"
                >
                  Check
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Game;
