import type { BricksGridProps } from "../types";
import { Brick } from "./Brick";

export const BricksGrid = ({
  bricksRef,
  material,
  brickHit,
}: BricksGridProps) => {
  return (
    <>
      {bricksRef.current.map((brick) => (
        <Brick
          key={brick.position.join()}
          {...brick}
          material={material}
          brickHit={brickHit}
        />
      ))}
    </>
  );
};
