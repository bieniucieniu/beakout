import { Canvas } from "@react-three/fiber";
import { Lights } from "./Lights";
import { OrbitControls } from "@react-three/drei";
import { Board } from "./Board";
import { useState } from "react";
import { BrickProps } from "./Brick";
import { Ball } from "./Ball";
const BOARD_WIDTH = 32;
const BOARD_HEIGHT = 24;
const GRID_WIDTH = 12;
const GRID_HEIGHT = 6;

type GameProps = {
  className?: string;
};

export const Game = ({ className }: GameProps) => {
  const [bricks, setBricks] = useState<BrickProps[]>(
    Array.from({ length: GRID_WIDTH * GRID_HEIGHT }, (_, i) => ({
      position: [
        (i % GRID_WIDTH) * (BOARD_WIDTH / GRID_WIDTH) -
          BOARD_WIDTH / 2 +
          BOARD_WIDTH / GRID_WIDTH / 2,
        Math.floor(i / GRID_WIDTH) * (BOARD_HEIGHT / GRID_HEIGHT / 2) +
          BOARD_HEIGHT / GRID_HEIGHT / 2 -
          1,
        1,
      ],
      size: [2, 1, 1],
      color: "red",
      points: 1,
    }))
  );
  return (
    <Canvas className={className} camera={{ position: [0, 0, 18] }}>
      <OrbitControls />
      <Board
        size={[BOARD_WIDTH, BOARD_HEIGHT]}
        position={[0, 0, -1]}
        bricks={bricks}
        setBricks={setBricks}
      />
      <Lights boardSize={[32, 24]} />
    </Canvas>
  );
};
