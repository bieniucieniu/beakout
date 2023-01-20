import { Ball } from "./Ball";
import type { BrickProps, BoardProps } from "../types";
import { useContactMaterial } from "@react-three/p2";
import { Border } from "./Border";
import { useRef } from "react";
import { Pad } from "./Pad";
import { BricksGrid } from "./BricksGrid";
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  BOARD_WIDTH,
  BOARD_HEIGHT,
} from "./constants";

export const Board = ({ size }: BoardProps) => {
  const bricksRef = useRef<BrickProps[]>(
    Array.from({ length: GRID_WIDTH * GRID_HEIGHT }, (_, i) => ({
      position: [
        (i % GRID_WIDTH) * (BOARD_WIDTH / GRID_WIDTH) -
          BOARD_WIDTH / 2 +
          BOARD_WIDTH / GRID_WIDTH / 2,
        Math.floor(i / GRID_WIDTH) * (BOARD_HEIGHT / GRID_HEIGHT / 2) +
          BOARD_HEIGHT / GRID_HEIGHT / 2 -
          1,
        0,
      ],
      size: [2, 1],
      depth: 1,
      color: "red",
      points: 1,
      name: `brick-${i}`,
    }))
  );

  const PadMaterial = {
    id: 1,
    restitution: 1,
    friction: 0,
  };

  const BallMaterial = {
    id: 2,
    restitution: 1,
    friction: 0,
  };

  const defaultMaterial = {
    id: 3,
    restitution: 0.9,
    friction: 0,
  };

  useContactMaterial(PadMaterial, BallMaterial, {
    friction: 0,
    restitution: 1.2,
  });

  return (
    <>
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      <BricksGrid bricksRef={bricksRef} material={defaultMaterial} />

      <Ball name="ball" material={BallMaterial} />

      <Border
        boardSize={[BOARD_WIDTH, BOARD_HEIGHT]}
        height={1}
        depth={2}
        color="red"
        material={defaultMaterial}
      />
      <Pad
        position={[0, -BOARD_HEIGHT / 2 + 1]}
        size={[5, 1]}
        color="red"
        material={PadMaterial}
        movingRange={[-BOARD_WIDTH / 2, BOARD_WIDTH / 2]}
        rotationRange={[-Math.PI / 4, Math.PI / 4]}
      />
    </>
  );
};
