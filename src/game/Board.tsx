import { Ball } from "./Ball";
import type { BrickProps, BoardProps } from "../types";
import { useContactMaterial } from "@react-three/p2";
import { Border } from "./Border";
import { useRef } from "react";
import { Pad } from "./Pad";
import { BricksGrid } from "./BricksGrid";
import materials from "./materials";
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  BOARD_WIDTH,
  BOARD_HEIGHT,
} from "./constants";
import { useThree } from "@react-three/fiber";

export const Board = ({ size, score, setScore, setIsPaused }: BoardProps) => {
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

  const brickHit = (brickName: string) => {
    if (bricksRef.current.length === 1) {
      alert("You win!");
      setIsPaused(true);
    }
    bricksRef.current = bricksRef.current.filter((b) => b.name !== brickName);
    console.log(score);
    setScore(score + 1);
    console.log(bricksRef.current);
  };

  useContactMaterial(materials.pad, materials.ball, {
    friction: 0,
    restitution: 1.15,
  });

  useContactMaterial(materials.ball, materials.default, {
    friction: 0,
    restitution: 0.7,
  });

  return (
    <>
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      <BricksGrid
        bricksRef={bricksRef}
        material={materials.default}
        removeBrick={brickHit}
      />

      <Ball
        name="ball"
        material={materials.ball}
        boardSize={[BOARD_WIDTH, BOARD_HEIGHT]}
        margin={3}
      />

      <Border
        boardSize={[BOARD_WIDTH, BOARD_HEIGHT]}
        height={1}
        depth={2}
        color="red"
        material={materials.default}
      />
      <Pad
        position={[0, -BOARD_HEIGHT / 2 + 1]}
        size={[BOARD_WIDTH - 1, 1]}
        color="navi"
        material={materials.pad}
        moveRange={[-BOARD_WIDTH / 2, BOARD_WIDTH / 2]}
        rotationRange={[-Math.PI / 12, Math.PI / 12]}
      />
    </>
  );
};
