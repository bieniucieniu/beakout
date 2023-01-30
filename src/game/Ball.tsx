import { useFrame } from "@react-three/fiber";
import { useCircle } from "@react-three/p2";
import { useEffect, useRef } from "react";
import { BallProps } from "../types";
import config from "../config.json";

export const Ball = ({ material, name, boardSize, margin }: BallProps) => {
  const ballConfig = config.game.ball;
  const [ref, api] = useCircle(() => ({
    type: "Dynamic",
    mass: ballConfig.mass,
    position: ballConfig.defaultPosition as [number, number],
    args: ballConfig.args as [number],
    velocity: ballConfig.defaultVelocity as [number, number],
    material,
  }));

  const posRef = useRef(ballConfig.defaultPosition as [number, number]);

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
      <sphereGeometry args={ballConfig.args as [number]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};
