import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/p2";
import { useRef } from "react";

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
  useFrame(() => {
    const unsubscribe = api.position.subscribe((v) => (posRef.current = v));
    return unsubscribe;
  });

  const angleRef = useRef(0);
  useFrame(() => {
    const unsubscribe = api.angle.subscribe((v) => (angleRef.current = v));
    console.log(angleRef.current);

    return unsubscribe;
  });

  useFrame(() => {
    if (posRef.current[0] <= moveRange[0] + size[0] / 2) {
      api.position.set(moveRange[0] + size[0] / 2, posRef.current[1]);
    } else if (posRef.current[0] >= moveRange[1] - size[0] / 2) {
      api.position.set(moveRange[1] - size[0] / 2, posRef.current[1]);
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
        api.velocity.set(-10, 0);
      }

      if (angleRef.current >= rotationRange[1]) {
        // api.angularVelocity.set(0);
      } else {
        api.angularVelocity.set(2);
      }
    } else if (e.key === "ArrowRight" || e.key === "d") {
      if (posRef.current[0] >= moveRange[1] - size[0] / 2) {
        // api.velocity.set(0, 0);
      } else {
        api.velocity.set(10, 0);
      }

      if (angleRef.current <= rotationRange[0]) {
        // api.angularVelocity.set(0);
      } else {
        api.angularVelocity.set(-2);
      }
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
  });

  return (
    <>
      {/* @ts-ignore */}
      <mesh ref={ref} name={"pad"}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};
