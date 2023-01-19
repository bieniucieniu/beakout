import { useCircle } from "@react-three/p2";
import { useRef } from "react";
import { BallProps } from "../types";

export const Ball = ({ material, name }: BallProps) => {
  const velocityVec = useRef<[number, number]>([1, 1]);

  const [ref, api] = useCircle(() => ({
    type: "Dynamic",
    mass: 0.1,
    position: [0, 0],
    args: [0.4],
    friction: 0,
    collisionResponse: true,
    velocity: velocityVec.current,
    material,
  }));

  return (
    //@ts-ignore
    <mesh ref={ref} name={name}>
      <sphereGeometry args={[0.4]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};
