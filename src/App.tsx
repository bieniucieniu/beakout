import { useEffect, useState } from "react";
import Game from "./game";
import { useTabFocus } from "./useTabFocus";
import config from "./game/config.json";
import { Navbar } from "./components/Navbar";
import { Button } from "./components/Button";
import { ScoreBlock } from "./components/ScoreBlock";

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
    <div className="w-screen h-screen overflow-hidden">
      <Navbar>
        <Button
          text={isPaused ? "Resume" : "Pause"}
          onClick={() => {
            setIsPausedbyPlayer(!isPaused);
            setIsPaused(!isPaused);
          }}
        />
        <div className="grid grid-cols-3">
          <ScoreBlock text="Score" value={score} />
          <ScoreBlock text="Lifes" value={lifes} />
          <Button
            text={isPlaying ? "restart" : "play"}
            onClick={() => setIsPlaying(!isPlaying)}
          />
        </div>
      </Navbar>

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
        <div className="grid grid-cols-3 grid-rows-1 h-full">
          <div className="col-start-1 col-end-1">s</div>
          <div className="col-start-2 col-end-2">
            <div className="grid grid-cols-2">
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
          </div>
          <div className="col-start-3 col-end-3">s</div>
        </div>
      )}
    </div>
  );
};
