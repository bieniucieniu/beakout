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
    console.log(ref.current!.position.x, ref.current!.position.y);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};
