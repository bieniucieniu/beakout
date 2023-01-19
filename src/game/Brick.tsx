import { useBox } from "@react-three/p2";
import type { BrickProps } from "../types";

export const Brick = ({
  position,
  color,
  size,
  name,
  material,
}: BrickProps) => {
  const [ref, api] = useBox(() => ({
    mass: 0,
    position: [position[0], position[1]],
    args: size,
    material,
    collisionResponse: true,
    onCollideBegin: (e) => {
      if (e.body.name === "ball") {
        ref.current!.removeFromParent();
        api.collisionResponse.set(false);
      }
    },
  }));

  return (
    <>
      {/* @ts-ignore */}
      <mesh ref={ref} name={name}>
        <boxGeometry args={[...size, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};
