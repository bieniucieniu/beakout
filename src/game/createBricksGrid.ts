import { BrickProps, TCreateGrid } from "../types";
import config from "./config.json";

export const createBricksGrid: TCreateGrid = (width, height, maxPoints) => {
  return Array.from({ length: width * height }, (_, i) => ({
    position: [
      (i % width) * (config.game.board.width / width) -
        config.game.board.width / 2 +
        config.game.board.width / width / 2,
      Math.floor(i / width) * (config.game.board.height / height / 2) +
        config.game.board.height / height / 2 -
        1,
      0,
    ],
    size: config.game.brick.size as [number, number],
    depth: config.game.brick.depth,
    colors: config.game.brick.colors,
    points: (i % maxPoints) + 1,
    name: `brick-${i}`,
  }));
};
