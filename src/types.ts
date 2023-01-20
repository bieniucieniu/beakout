import { PublicApi } from "@react-three/p2";
import { Object3D } from "three";

export {};

export type BrickProps = {
  position: [number, number, number];
  size: [number, number];
  color: string;
  depth: number;
  points: number;
  name: string;
  material?: p2.MaterialOptions;
};

export type GameProps = {
  className?: string;
};

export type BoardProps = {
  size: [number, number];
};

export type BoxProps = {
  position: [number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
  color: string;
};

export type BallProps = {
  material: p2.MaterialOptions;
  name: string;
};

export type LightsProps = {
  boardSize: [number, number];
  lightOffset?: number;
  lightIntensity?: number;
  ambientIntensity?: number;
};

export type BorderProps = {
  boardSize: [number, number];
  height: number;
  depth: number;
  color: string;
  material?: p2.MaterialOptions;
};

export type PadProps = {
  position: [number, number];
  size: [number, number];
  color: string;
  material?: p2.MaterialOptions;
  moveRange: [number, number];
  rotationRange: [number, number];
};

export type BricksGridProps = {
  bricksRef: React.MutableRefObject<BrickProps[]>;
  material: p2.MaterialOptions;
};
