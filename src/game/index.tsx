import { Canvas } from "@react-three/fiber";
import { Lights } from "./Lights";
import { OrbitControls } from "@react-three/drei";
import { Board } from "./Board";
import type { GameProps } from "../types";
import { Physics } from "@react-three/p2";
const BOARD_WIDTH = 32;
const BOARD_HEIGHT = 24;

export default ({ className }: GameProps) => {
  return (
    <Canvas className={className} camera={{ position: [0, 0, 18] }}>
      <OrbitControls />
      <Physics
        normalIndex={2}
        gravity={[0, -6]}
        defaultContactMaterial={{
          friction: 0,
          restitution: 1,
        }}
      >
        <Board size={[BOARD_WIDTH, BOARD_HEIGHT]} />
      </Physics>
      <Lights boardSize={[32, 24]} lightIntensity={0.3} />
    </Canvas>
  );
};
