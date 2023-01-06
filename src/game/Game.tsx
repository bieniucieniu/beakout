import { Canvas, useThree } from "@react-three/fiber";
import { Box } from "./Box";
import { Lights } from "./Lights";
import { OrbitControls } from "@react-three/drei";
import { Board } from "./Board";

type GameProps = {
  className?: string;
};

const CammeraHelper = () => {
  const camera = useThree((state) => state.camera);
  return <primitive object={camera} />;
};

export const Game = ({ className }: GameProps) => {
  return (
    <Canvas className={className} camera={{ position: [0, 0, 10] }}>
      <OrbitControls />
      <Board size={[16, 12]} />
      <Box />
      <Lights boardSize={[16, 12]} />
      <CammeraHelper />
    </Canvas>
  );
};
