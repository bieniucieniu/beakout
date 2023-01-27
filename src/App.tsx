import { useState } from "react";
import Game from "./game";

export const App = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  return (
    <div className="w-screen h-screen grid bg-zinc-600">
      <nav className="h-12 bg-cyan-300 grid grid-cols-2">
        <button className="" onClick={() => setIsPaused(!isPaused)}>
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
