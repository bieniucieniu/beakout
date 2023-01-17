export type BrickProps = {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  points: number;
};

export const Brick = ({ position, color, size }: BrickProps) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size ?? [1, 2, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
