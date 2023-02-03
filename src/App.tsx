import { useEffect, useState } from "react";
import Game from "./game";
import { useTabFocus } from "./useTabFocus";
import config from "./config.json";

export const App = () => {
  const [isPausedbyPlayer, setIsPausedbyPlayer] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [lifes, setLifes] = useState(config.game.lifes);
  const [maxPoints, setMaxPoints] = useState(config.game.brick.maxPoinst);

  useTabFocus(
    () => !isPausedbyPlayer && setIsPaused(false),
    () => setIsPaused(true)
  );

  useEffect(() => {
    if (lifes <= 0) {
      setIsPaused(true);
      setIsPlaying(false);
      setLifes(config.game.lifes);
    }
  }, [lifes]);

  return (
    <div className="w-screen h-screen grid">
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
        <div className="grid grid-cols-3">
          <div className="text-center m-auto">Score: {score}</div>
          <div className="text-center m-auto">Lifes: {lifes}</div>
          <button
            className="text-center m-auto"
            onClick={() => setIsPlaying(false)}
          >
            restart
          </button>
        </div>
      </nav>
      <div className="grid grid-cols-3">
        <div className="col-start-1 col-end-1">s</div>
        <div className="col-start-2 col-end-2">
          {isPlaying ? (
            <Game
              isPaused={isPaused}
              setIsPaused={setIsPaused}
              score={score}
              setScore={setScore}
              lifes={lifes}
              setLifes={setLifes}
              maxPoints={maxPoints}
            />
          ) : (
            <>
              <div className="grid grid-cols-2">
                <form className="" onFocus={() => setIsPaused(true)}>
                  <label>
                    <span>max points: </span>
                    <input type="number" value={maxPoints} />
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={12}
                    value={maxPoints}
                    onFocus={() => setIsPaused(true)}
                    onChange={(e) => setMaxPoints(parseInt(e.target.value))}
                  />
                  <button type="submit">reStart</button>
                </form>
              </div>
              <button
                className="m-auto"
                onClick={() => {
                  setIsPlaying(true);
                  setIsPaused(false);
                }}
              >
                Start
              </button>
            </>
          )}
        </div>
        <div className="col-start-3 col-end-3">s</div>
      </div>
    </div>
  );
};
