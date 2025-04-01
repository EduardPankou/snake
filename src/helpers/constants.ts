import {IScene, ISize, ISnake} from "./types";

export const SCENE: IScene = {
  WIDTH: 900,
  HEIGHT: 750
} as const

export const APPLE: ISize = {
  WIDTH: 50,
  HEIGHT: 50
}

export const SNAKE_BLOCK: ISnake = {
  WIDTH: 40,
  HEIGHT: 40,
  SPEED: 2
}

export const KEYBOARD = {
  S: 's',
  W: 'w',
  D: 'd',
  A: 'a',
}

export const KEYBOARD_LIST: string[] = [
  KEYBOARD.A,
  KEYBOARD.W,
  KEYBOARD.S,
  KEYBOARD.D,
]