import { useBox } from "@react-three/p2";
import { useRef, useState } from "react";
import type { BrickProps } from "../types";
import config from "../config.json";

export const Brick = ({
  position,
  colors,
  size,
  name,
  material,
  points,
  removeBrick,
}: BrickProps) => {
  const pointsTracker = useRef(points);
  const [colorState, setColorState] = useState(`blue`);
  const [ref, api] = useBox(() => ({
    mass: config.game.brick.mass,
    position: [position[0], position[1]],
    args: size,
    material,
    collisionResponse: true,
    onCollideBegin: (e) => {
      if (e.body.name === "ball") {
        pointsTracker.current -= 1;
        setColorState(
          `0x0${pointsTracker.current}0${pointsTracker.current}0${pointsTracker.current}`
        );
        if (pointsTracker.current === 0) {
          ref.current!.removeFromParent();
          api.collisionResponse.set(false);
          if (removeBrick) removeBrick(name);
        }
      }
    },
  }));

  return (
    <>
      {/* @ts-ignore */}
      <mesh ref={ref} name={name}>
        <boxGeometry args={[...size, 1]} />
        <meshStandardMaterial
          // color={`#0${pointsTracker}0${pointsTracker}0${pointsTracker}`}
          color={colors[pointsTracker.current - 1]}
        />
      </mesh>
    </>
  );
};
