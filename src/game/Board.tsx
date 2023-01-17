import type { BrickProps } from "./Brick";
import { Brick } from "./Brick";
import { Ball } from "./Ball";

const BOARD_WIDTH = 32;
const BOARD_HEIGHT = 24;
const GRID_WIDTH = 12;
const GRID_HEIGHT = 6;

type BoardProps = {
  size: [number, number];
  position?: [number, number, number];
  bricks: BrickProps[];
  setBricks: (bricks: BrickProps[]) => void;
};

export const Board = ({ size, position, bricks, setBricks }: BoardProps) => {
  return (
    <>
      <mesh position={position}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="hotpink" />
        {bricks?.map(
          (brick) =>
            brick.points && <Brick key={brick.position.join()} {...brick} />
        )}
        <Ball
          boardSize={[BOARD_WIDTH, BOARD_HEIGHT]}
          bricks={bricks}
          setBricks={setBricks}
        />
      </mesh>
    </>
  );
};
