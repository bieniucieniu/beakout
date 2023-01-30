import { Ball } from "./Ball";
import type { BrickProps, BoardProps } from "../types";
import { useContactMaterial } from "@react-three/p2";
import { Border } from "./Border";
import { useRef } from "react";
import { Pad } from "./Pad";
import { BricksGrid } from "./BricksGrid";
import config from "../config.json";
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  BOARD_WIDTH,
  BOARD_HEIGHT,
} from "./constants";

export const Board = ({
  size,
  score,
  setScore,
  isPaused,
  setIsPaused,
}: BoardProps) => {
  const scoreRef = useRef(score);
  const bricksRef = useRef<BrickProps[]>(
    Array.from(
      { length: config.game.board.grid.width * config.game.board.grid.height },
      (_, i) => ({
        position: [
          (i % config.game.board.grid.width) *
            (config.game.board.width / config.game.board.grid.width) -
            config.game.board.width / 2 +
            config.game.board.width / config.game.board.grid.width / 2,
          Math.floor(i / config.game.board.grid.width) *
            (config.game.board.height / config.game.board.grid.height / 2) +
            config.game.board.height / config.game.board.grid.height / 2 -
            1,
          0,
        ],
        size: config.game.brick.size as [number, number],
        depth: config.game.brick.depth,
        colors: config.game.brick.colors,
        points: (i % (config.game.brick.maxPoinst - 1)) + 1,
        name: `brick-${i}`,
      })
    )
  );

  const brickHit = (brickName: string) => {
    if (bricksRef.current.length === 1) {
      alert("You win!");
      setIsPaused(true);
    }
    bricksRef.current = bricksRef.current.filter((b) => b.name !== brickName);
    setScore(++scoreRef.current);
    console.log(bricksRef.current);
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
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      <BricksGrid
        bricksRef={bricksRef}
        material={config.game.materials.default}
        removeBrick={brickHit}
      />

      <Ball
        name="ball"
        material={config.game.materials.ball}
        boardSize={[config.game.board.width, config.game.board.height]}
        margin={3}
        isPaused={isPaused}
      />

      <Border
        boardSize={[config.game.board.width, config.game.board.height]}
        height={1}
        depth={2}
        color="red"
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
