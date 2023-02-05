import { useFrame } from "@react-three/fiber";
import { useCircle } from "@react-three/p2";
import { useEffect, useRef } from "react";
import { BallProps } from "../types";
import config from "./config.json";

export const Ball = ({
  material,
  name,
  boardSize,
  margin,
  lifes,
  setLifes,
}: BallProps) => {
  const [ref, api] = useCircle(() => ({
    type: "Dynamic",
    mass: config.game.ball.mass,
    position: config.game.ball.defaultPosition as [number, number],
    args: config.game.ball.args as [number],
    velocity: config.game.ball.defaultVelocity as [number, number],
    material,
  }));

  const posRef = useRef(config.game.ball.defaultPosition as [number, number]);
  useEffect(() => {
    const unsubscribe = api.position.subscribe((v) => (posRef.current = v));
    return unsubscribe;
  });

  const velocityRef = useRef(config.game.ball.defaultVelocity);
  useEffect(() => {
    const unsubscribe = api.velocity.subscribe(
      (v) => (velocityRef.current = v)
    );
    return unsubscribe;
  });

  const VelTimerRef = useRef(0);

  const lifesRef = useRef(lifes);

  useFrame(() => {
    if (posRef.current[0] <= -boardSize[0] / 2 - margin) {
      api.position.set(-boardSize[0] / 2 + margin, posRef.current[1]);
    } else if (posRef.current[0] >= boardSize[0] / 2 + margin) {
      api.position.set(boardSize[0] / 2 - margin, posRef.current[1]);
    }
    if (posRef.current[1] >= boardSize[1] / 2 + margin) {
      api.position.set(posRef.current[0], boardSize[1] / 2 - margin);
    }

    if (posRef.current[1] <= -boardSize[1] / 2 - margin) {
      api.position.copy(config.game.ball.defaultPosition as [number, number]);
      api.velocity.copy(config.game.ball.defaultVelocity as [number, number]);
      lifesRef.current--;
      setLifes(lifesRef.current);
      console.log("Game Over");
    }

    if (
      // velocityRef.current[0] < 0.0001 &&
      velocityRef.current[1] < 0.0001 &&
      // velocityRef.current[0] > -0.0001 &&
      velocityRef.current[1] > -0.0001
    ) {
      VelTimerRef.current++;

      if (VelTimerRef.current > config.game.ball.idleTimeLimit) {
        api.velocity.set(
          (Math.random() - 0.5) * config.game.ball.awaikeningVelocity,
          config.game.ball.awaikeningVelocity
        );
        VelTimerRef.current = 0;
      }
    } else {
      VelTimerRef.current = 0;
    }
  });

  return (
    //@ts-ignore
    <mesh ref={ref} name={name}>
      <sphereGeometry args={config.game.ball.args as [number]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};
