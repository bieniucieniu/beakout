import type { BrickProps } from "./Brick";
import { Brick } from "./Brick";

type BoardProps = {
  size: [number, number];
  position?: [number, number, number];
  bricks?: BrickProps[];
};

export const Board = ({ size, position, bricks }: BoardProps) => {
  return (
    <>
      <mesh position={position}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      {bricks?.map((brick) => (
        <Brick key={brick.position.join()} {...brick} />
      ))}
    </>
  );
};
