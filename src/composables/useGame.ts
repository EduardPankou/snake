import useSnake from "./useSnake";
import useApple from "./useApple";
import {APPLE, SNAKE_BLOCK} from "../helpers/constants";
import {ICoordinates} from "../helpers/types";

export default function useGame() {
  let intervalId = null
  const {
    snake,
    activeKey,
    drawSnake,
    move,
    resetSnake,
    increaseSnake,
    addKeysListeners,
    removeKeysListeners
  } = useSnake()
  const {
    apple,
    drawApple,
    resetApple
  } = useApple()

  const draw = (ctx: CanvasRenderingContext2D): void => {
    drawApple(ctx)
    drawSnake(ctx)
  }

  const checkAppleCollisions = (): void => {
    for (let i: number = snake.value.length - 1; i >= 0; i--) {
      const block: ICoordinates = snake.value[i];

      const isColliding: boolean =
        block.x + SNAKE_BLOCK.WIDTH > apple.value.x &&
        block.x < apple.value.x + APPLE.WIDTH &&
        block.y + SNAKE_BLOCK.HEIGHT > apple.value.y &&
        block.y < apple.value.y + APPLE.HEIGHT;

      if (isColliding) {
        resetApple()
        increaseSnake(activeKey.value)
      }
    }
  }

  const checkSnakeCollisions = (): void => {
    const head: ICoordinates = snake.value[0]
    for (let i: number = snake.value.length - 1; i >= 1; i--) {
      const block: ICoordinates = snake.value[i];

      const isColliding: boolean =
        block.x < head.x + SNAKE_BLOCK.WIDTH &&
        block.x + SNAKE_BLOCK.WIDTH > head.x &&
        block.y < head.y + SNAKE_BLOCK.HEIGHT &&
        block.y + SNAKE_BLOCK.HEIGHT > head.y;

      if (isColliding) {
        resetApple()
        resetSnake()
        break;
      }
    }
  }

  const intervalMove = (): void => {
    intervalId = setInterval(move, 200)
  }

  const clearIntervalMove = (): void => {
    clearInterval(intervalId)
    intervalId = null
  }
  
  const checkCollisions = () => {
    checkAppleCollisions()
    checkSnakeCollisions()
  }
  return {
    snake,
    draw,
    move,
    addKeysListeners,
    removeKeysListeners,
    checkCollisions,
    intervalMove,
    clearIntervalMove
  }
}