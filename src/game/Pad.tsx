import { useFrame } from "@react-three/fiber";
import { useBox, useContactMaterial } from "@react-three/p2";
import { useEffect, useRef } from "react";
import config from "./config.json";

import type { PadProps } from "../types";

export const Pad = ({
  position,
  color,
  size,
  material,
  moveRange,
  rotationRange,
}: PadProps) => {
  const [ref, api] = useBox(() => ({
    type: "Kinematic",
    position: [position[0], position[1]],
    args: size,
    collisionResponse: true,
    material,
  }));

  const posRef = useRef([0, 0]);
  useEffect(() => {
    const unsubscribe = api.position.subscribe((v) => (posRef.current = v));
    return unsubscribe;
  });

  const angleRef = useRef(0);
  useEffect(() => {
    const unsubscribe = api.angle.subscribe((v) => (angleRef.current = v));
    return unsubscribe;
  });

  useFrame(() => {
    if (posRef.current[0] <= moveRange[0] + size[0] / 2) {
      api.position.set(moveRange[0] + size[0] / 2 + 0.02, posRef.current[1]);
    } else if (posRef.current[0] >= moveRange[1] - size[0] / 2) {
      api.position.set(moveRange[1] - size[0] / 2 - 0.02, posRef.current[1]);
    }

    if (angleRef.current < rotationRange[0]) {
      api.angularVelocity.set(0);
      api.angle.set(rotationRange[0]);
    } else if (angleRef.current > rotationRange[1]) {
      api.angularVelocity.set(0);
      api.angle.set(rotationRange[1]);
    }
  });

  const moveLeftRef = useRef(false);
  const moveRightRef = useRef(false);
  const boostRef = useRef(false);

  const handleMove = () => {
    if (moveLeftRef.current) {
      if (posRef.current[0] > moveRange[0] + size[0] / 2 + 0.02) {
        api.velocity.set(
          boostRef.current
            ? -config.game.pad.velocity * config.game.pad.boostMultiplier
            : -config.game.pad.velocity,
          0
        );
      }
      if (angleRef.current < rotationRange[1]) {
        api.angularVelocity.set(config.game.pad.angularVelocity);
      }
    } else if (moveRightRef.current) {
      if (posRef.current[0] < moveRange[1] - size[0] / 2 - 0.02) {
        api.velocity.set(
          boostRef.current
            ? config.game.pad.velocity * config.game.pad.boostMultiplier
            : config.game.pad.velocity,
          0
        );
      }

      if (angleRef.current > rotationRange[0]) {
        api.angularVelocity.set(-config.game.pad.angularVelocity);
      }
    } else {
      api.velocity.set(0, 0);
      api.angularVelocity.set(0);
    }
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      moveLeftRef.current = true;
    } else if (e.key === "ArrowRight" || e.key === "d") {
      moveRightRef.current = true;
    } else if (e.key === " ") {
      boostRef.current = true;
    } else {
      return;
    }
    handleMove();
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      moveLeftRef.current = false;
    } else if (e.key === "ArrowRight" || e.key === "d") {
      moveRightRef.current = false;
    } else if (e.key === " ") {
      boostRef.current = false;
    } else {
      return;
    }
    handleMove();
  });

  const handleClick = () => {
    console.log(posRef.current, angleRef.current, ref);
  };

  return (
    <>
      {/* @ts-ignore */}
      <mesh ref={ref} name={"pad"} onClick={handleClick}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};
