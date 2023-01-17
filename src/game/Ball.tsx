import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BrickProps } from "./Brick";

type BallProps = {
  boardSize: [number, number];
  bricks: BrickProps[];
  setBricks: (bricks: BrickProps[]) => void;
};

export const Ball = ({ boardSize, bricks, setBricks }: BallProps) => {
  const ref = useRef<THREE.Mesh>(null);

  const [velocityVec, setVelocityVec] = useState([0.1, 0.1]);
  // border collision
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

    // brick collision
    bricks.forEach((brick) => {
      const brickX = brick.position[0];
      const brickY = brick.position[1];
      const brickWidth = brick.size[0];
      const brickHeight = brick.size[1];
      const ballX = ref.current!.position.x;
      const ballY = ref.current!.position.y;
      const ballRadius = 0.4;
      if (
        ballX + ballRadius > brickX - brickWidth / 2 &&
        ballX - ballRadius < brickX + brickWidth / 2 &&
        ballY + ballRadius > brickY - brickHeight / 2 &&
        ballY - ballRadius < brickY + brickHeight / 2
      ) {
        if (Math.abs(ballX - brickX) < brickHeight / 2) {
          setVelocityVec([velocityVec[0], velocityVec[1] * -1]);
        } else if (Math.abs(ballY - brickY) < brickWidth / 2) {
          setVelocityVec([velocityVec[0] * -1, velocityVec[1]]);
        }
        ref.current!.position.x += velocityVec[0];
        ref.current!.position.y += velocityVec[1];
        setBricks(
          bricks.filter((b) => {
            if (brick.position.join() === b.position.join()) {
              return false;
            } else {
              return true;
            }
          })
        );
      }
    });
  });

  return (
    <mesh ref={ref} position={[0, -4, 1]}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};
