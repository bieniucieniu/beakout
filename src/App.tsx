import { useState } from "react";
import Game from "./game";

export const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-screen h-screen grid bg-zinc-600">
      <nav className="h-12 bg-cyan-300">
        <button className="" onClick={() => setIsPlaying(!isPlaying)}>
          play
        </button>
      </nav>
      {isPlaying && <Game />}
    </div>
  );
};
