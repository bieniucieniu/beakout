import { useBox } from "@react-three/p2";
import { useRef, useState } from "react";
import type { BrickProps } from "../types";
import config from "./config.json";

export const Brick = ({
  position,
  colors,
  size,
  name,
  material,
  points,
  brickHit,
}: BrickProps) => {
  const pointsTracker = useRef(points);
  const [ref, api] = useBox(() => ({
    mass: config.game.brick.mass,
    position: [position[0], position[1]],
    args: size,
    material,
    collisionResponse: true,
    onCollideBegin: (e) => {
      if (e.body.name === "ball") {
        pointsTracker.current -= 1;
        if (brickHit) brickHit(name, pointsTracker.current);
        if (pointsTracker.current === 0) {
          ref.current!.removeFromParent();
          api.collisionResponse.set(false);
        }
      }
    },
  }));
  const handleOnClick = () => {
    console.log(pointsTracker.current);
  };

  return (
    <>
      {/* @ts-ignore */}
      <mesh ref={ref} name={name} onClick={handleOnClick}>
        <boxGeometry args={[...size, 1]} />
        <meshStandardMaterial
          // color={`#0${pointsTracker}0${pointsTracker}0${pointsTracker}`}
          color={colors[pointsTracker.current - 1]}
        />
      </mesh>
    </>
  );
};
