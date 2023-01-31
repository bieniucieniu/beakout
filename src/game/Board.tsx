import { Ball } from "./Ball";
import type { BrickProps, BoardProps } from "../types";
import { useContactMaterial } from "@react-three/p2";
import { Border } from "./Border";
import { useRef } from "react";
import { Pad } from "./Pad";
import { BricksGrid } from "./BricksGrid";
import config from "../config.json";
import { createGrid } from "./createGrid";

export const Board = ({
  score,
  setScore,
  isPaused,
  setIsPaused,
  lifes,
  setLifes,
  maxPoints,
}: BoardProps) => {
  const scoreRef = useRef(score);
  const bricksRef = useRef<BrickProps[]>(
    createGrid(
      config.game.board.grid.width,
      config.game.board.grid.height,
      maxPoints
    )
  );

  const brickHit = (brickName: string, points: number) => {
    if (bricksRef.current.length === 1) {
      alert("You win!");
      setIsPaused(true);
    }
    if (points <= 0) {
      bricksRef.current = bricksRef.current.filter((b) => b.name !== brickName);
    }
    setScore(++scoreRef.current);
  };

  useContactMaterial(
    config.game.materials.pad,
    config.game.materials.ball,
    config.game.materials.padBall
  );

  useContactMaterial(
    config.game.materials.ball,
    config.game.materials.default,
    config.game.materials.ballDefault
  );

  return (
    <>
      <BricksGrid
        bricksRef={bricksRef}
        material={config.game.materials.default}
        brickHit={brickHit}
      />

      <Ball
        name="ball"
        material={config.game.materials.ball}
        boardSize={[config.game.board.width, config.game.board.height]}
        margin={3}
        isPaused={isPaused}
        lifes={lifes}
        setLifes={setLifes}
      />

      <Border
        boardSize={[config.game.board.width, config.game.board.height]}
        height={config.game.border.height}
        depth={config.game.border.depth}
        color={config.game.border.color}
        material={config.game.materials.default}
      />
      <Pad
        position={[0, -config.game.board.height / 2 + 1]}
        size={config.game.pad.size as [number, number]}
        depth={config.game.pad.depth}
        color={config.game.pad.color}
        material={config.game.materials.pad}
        moveRange={[-config.game.board.width / 2, config.game.board.width / 2]}
        rotationRange={config.game.pad.rotationRange as [number, number]}
      />
    </>
  );
};
