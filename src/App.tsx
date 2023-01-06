import { Game } from "./game/Game";

export const App = () => {
  return (
    <div className="w-screen h-screen grid bg-zinc-900">
      <nav className="h-12 bg-cyan-300"> </nav>
      <Game />
    </div>
  );
};
