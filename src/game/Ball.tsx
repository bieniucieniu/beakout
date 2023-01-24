import { useFrame } from "@react-three/fiber";
import { useCircle } from "@react-three/p2";
import { useEffect, useRef } from "react";
import { Vector2 } from "three";
import { BallProps } from "../types";

export const Ball = ({ material, name, boardSize, margin }: BallProps) => {
  const velocityVec = useRef<[number, number]>(
    new Vector2(Math.random(), Math.random())
      .normalize()
      .multiplyScalar(2)
      .toArray()
  );

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

  const posRef = useRef([0, 0]);

  useEffect(() => {
    const unsubscribe = api.position.subscribe((v) => (posRef.current = v));
    return unsubscribe;
  });

  useFrame(() => {
    if (posRef.current[0] <= -boardSize[0] / 2 - margin) {
      api.position.set(-boardSize[0] / 2 + margin, posRef.current[1]);
    } else if (posRef.current[0] >= boardSize[0] / 2 + margin) {
      api.position.set(boardSize[0] / 2 - margin, posRef.current[1]);
    }

    if (posRef.current[1] <= -boardSize[1] / 2 - margin) {
      api.position.set(posRef.current[0], -boardSize[1] / 2 + margin);
    } else if (posRef.current[1] >= boardSize[1] / 2 + margin) {
      api.position.set(posRef.current[0], boardSize[1] / 2 - margin);
    }
  });

  return (
    //@ts-ignore
    <mesh ref={ref} name={name}>
      <sphereGeometry args={[0.4]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};
