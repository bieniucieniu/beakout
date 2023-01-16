import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BrickProps } from "./Brick";

type BallProps = {
  boardSize: [number, number];
  bricks: BrickProps[];
};

export const Ball = ({ boardSize, bricks }: BallProps) => {
  const ref = useRef<THREE.Mesh>(null);

  const [velocityVec, setVelocityVec] = useState([0.01, 0.01]);

  useFrame(() => {
    ref.current!.position.x += velocityVec[0];
    ref.current!.position.y += velocityVec[1];
    if (
      ref.current!.position.x > boardSize[0] / 2 ||
      ref.current!.position.x < -boardSize[0] / 2
    ) {
      setVelocityVec([velocityVec[0] * -1, velocityVec[1]]);
    }

    if (
      ref.current!.position.y > boardSize[1] / 2 ||
      ref.current!.position.y < -boardSize[1] / 2
    ) {
      setVelocityVec([velocityVec[0], velocityVec[1] * -1]);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};
