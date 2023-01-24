import { useBox } from "@react-three/p2";
import { useRef, useState } from "react";
import type { BrickProps } from "../types";

export const Brick = ({
  position,
  color,
  size,
  name,
  material,
  points,
}: BrickProps) => {
  const pointsTracker = useRef(points);
  const [colorState, setColorState] = useState(
    `#0${pointsTracker}0${pointsTracker}0${pointsTracker}`
  );
  const [ref, api] = useBox(() => ({
    mass: 0,
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
          color={colorState}
        />
      </mesh>
    </>
  );
};
