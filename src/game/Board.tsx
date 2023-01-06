type BoardProps = {
  size: [number, number];
  position?: [number, number, number];
};

export const Board = ({ size, position }: BoardProps) => {
  return (
    <>
      <mesh position={position}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  );
};
