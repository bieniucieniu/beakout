type BoxProps = {
  position: [number, number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
  color: string;
};

export const Box = ({ position, size, rotation, color }: BoxProps) => {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
