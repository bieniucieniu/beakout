type PadProps = {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
};

export const Pad = ({ position, size, color }: PadProps) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color || "red"} />
    </mesh>
  );
};
