import { BorderProps } from "../types";
import { useBox } from "@react-three/p2";

export const Border = ({
  boardSize,
  height,
  depth,
  color,
  material,
}: BorderProps) => {
  const [ref1] = useBox(() => ({
    type: "Kinematic",
    position: [-(boardSize[0] + height) / 2, height / 2],
    args: [height, boardSize[1] + height],
    collisionResponse: true,
    material,
  }));
  const [ref2] = useBox(() => ({
    type: "Kinematic",
    position: [(boardSize[0] + height) / 2, height / 2],
    collisionResponse: true,
    args: [height, boardSize[1] + height],
    material,
  }));
  const [ref3] = useBox(() => ({
    type: "Kinematic",
    position: [0, (boardSize[1] + height) / 2],
    collisionResponse: true,
    args: [boardSize[0], height],
    material,
  }));

  return (
    <>
      {/* @ts-ignore */}
      <mesh ref={ref1} name={"border-W"}>
        <boxGeometry args={[height, boardSize[1] + height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* @ts-ignore */}
      <mesh ref={ref2} name={"border-E"}>
        <boxGeometry args={[height, boardSize[1] + height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* @ts-ignore */}
      <mesh ref={ref3} name={"border-N"}>
        <boxGeometry args={[boardSize[0], height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};
