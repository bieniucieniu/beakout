import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/p2";
import { useEffect, useRef } from "react";
import config from "../config.json";

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
  const boostRef = useRef(false);

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

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      if (posRef.current[0] <= moveRange[0] + size[0] / 2) {
        // api.velocity.set(0, 0);
      } else {
        api.velocity.set(
          boostRef.current
            ? -config.game.pad.velocity * config.game.pad.boostMultiplier
            : -config.game.pad.velocity,
          0
        );
      }

      if (angleRef.current >= rotationRange[1]) {
        // api.angularVelocity.set(0);
      } else {
        api.angularVelocity.set(config.game.pad.angularVelocity);
      }
    } else if (e.key === "ArrowRight" || e.key === "d") {
      if (posRef.current[0] >= moveRange[1] - size[0] / 2) {
        // api.velocity.set(0, 0);
      } else {
        api.velocity.set(
          boostRef.current
            ? config.game.pad.velocity * config.game.pad.boostMultiplier
            : config.game.pad.velocity,
          0
        );
      }

      if (angleRef.current <= rotationRange[0]) {
        // api.angularVelocity.set(0);
      } else {
        api.angularVelocity.set(-config.game.pad.angularVelocity);
      }
    }

    if (e.key === " ") {
      boostRef.current = true;
      console.log("chuj");
    }
  });

  window.addEventListener("keyup", (e) => {
    if (
      e.key === "ArrowLeft" ||
      e.key === "a" ||
      e.key === "ArrowRight" ||
      e.key === "d"
    ) {
      api.velocity.set(0, 0);
      api.angularVelocity.set(0);
    }

    if (e.key === " ") {
      boostRef.current = false;
    }
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
