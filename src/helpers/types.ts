export interface ISize {
  WIDTH: number;
  HEIGHT: number;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export type IScene = ISize

export type ISnake = ISize & {
  SPEED: number
}