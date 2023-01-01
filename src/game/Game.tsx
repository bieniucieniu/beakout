import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

type GameProps = {
  className?: string;
};

export const Game = ({ className }: GameProps) => {
  const [active, setActive] = useState(false);
  const ref = useRef<Mesh>(null);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <Canvas className={className}>
      <mesh onClick={handleClick} ref={ref}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={active ? "hotpink" : "green"} />
      </mesh>
      <ambientLight />
    </Canvas>
  );
};
