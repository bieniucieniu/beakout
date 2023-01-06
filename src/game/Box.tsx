import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

export const Box = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<Mesh>(null);
  const handleClick = () => {
    setActive(!active);
  };
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh onClick={handleClick} ref={ref}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={active ? "hotpink" : "green"} />
    </mesh>
  );
};
