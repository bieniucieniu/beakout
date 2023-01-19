import { useBox } from "@react-three/p2";

import type { PadProps } from "../types";

export const Pad = ({ position, color, size, material }: PadProps) => {
  const [ref, api] = useBox(() => ({
    type: "Kinematic",
    position: [position[0], position[1]],
    args: size,
    collisionResponse: true,
    material,
  }));

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      api.velocity.set(-7, 0);
    } else if (e.key === "ArrowRight" || e.key === "d") {
      api.velocity.set(7, 0);
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      api.velocity.set(0, 0);
    } else if (e.key === "ArrowRight" || e.key === "d") {
      api.velocity.set(0, 0);
    }
  });

  return (
    <>
      {/* @ts-ignore */}
      <mesh ref={ref} name={"pad"}>
        <boxGeometry args={[...size, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};
