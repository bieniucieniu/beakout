import { useState } from "react";
import Game from "./game";
import { useTabFocus } from "./useTabFocus";

export const App = () => {
  const [isPausedbyPlayer, setIsPausedbyPlayer] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);

  useTabFocus(
    () => !isPausedbyPlayer && setIsPaused(false),
    () => setIsPaused(true)
  );

  return (
    <div className="w-screen h-screen grid ">
      <nav className="h-12 bg-cyan-300 grid grid-cols-2">
        <button
          className=""
          onClick={() => {
            setIsPausedbyPlayer(!isPaused);
            setIsPaused(!isPaused);
          }}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        <div className="text-center m-auto">Score: {score}</div>
      </nav>

      <Game
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        score={score}
        setScore={setScore}
      />
    </div>
  );
};
