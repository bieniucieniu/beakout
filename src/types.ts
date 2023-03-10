export type BrickProps = {
  position: [number, number, number];
  size: [number, number];
  colors: string[];
  depth: number;
  points: number;
  name: string;
  material?: p2.MaterialOptions;
  brickHit?: (brick: string, points: number) => void;
};

export type GameProps = {
  className?: string;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  score: number;
  setScore: (score: number) => void;
  lifes: number;
  setLifes: (lifes: number) => void;
};

export type BoardProps = {
  size: [number, number];
  score: number;
  isPaused: boolean;
  setScore: (score: number) => void;
  setIsPaused: (isPaused: boolean) => void;
  lifes: number;
  setLifes: (lifes: number) => void;
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
  boardSize: [number, number];
  margin: number;
  isPaused: boolean;
  lifes: number;
  setLifes: (lifes: number) => void;
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
  depth: number;
  color: string;
  material?: p2.MaterialOptions;
  moveRange: [number, number];
  rotationRange: [number, number];
};

export type BricksGridProps = {
  bricksRef: React.MutableRefObject<BrickProps[]>;
  material: p2.MaterialOptions;
  brickHit: (brick: string, points: number) => void;
};
