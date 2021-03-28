import React from "react";
const Start_Game = ({ phraseHandler, start }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="word">Phrase</label>
        <input
        autoFocus={true}
          onChange={phraseHandler}
          onKeyPress={(event)=>{
             if (event.key==="Enter") {
                start();
             }
          }}
          type="password"
          className="form-control"
        />
      </div>
      <div className="form-group text-center">
        <button onClick={start} type="button">
          Start Game
        </button>
      </div>
    </div>
  );
};
export default Start_Game;
