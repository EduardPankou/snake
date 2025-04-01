import {ref} from "vue";
import {ICoordinates} from "../helpers/types";
import {SNAKE_BLOCK, SCENE, KEYBOARD} from "../helpers/constants";
import useKeyboard from "./useKeyboard";

type ISnake = ICoordinates

export default function useSnake() {
  const {
    activeKey,
    removeKeysListeners,
    addKeysListeners
  } = useKeyboard()

  const snake = ref<ISnake[]>([{
    y: 0,
    x: 0
  }])

  const drawSnake = (ctx: CanvasRenderingContext2D): void => {
    for (const {x, y} of snake.value) {
      ctx.fillStyle = 'RED';
      ctx.fillRect(x, y, SNAKE_BLOCK.WIDTH, SNAKE_BLOCK.HEIGHT);
    }
  }

  const increaseSnake = (key: string) => {
    const tail =  snake.value[snake.value.length - 1]
    let x = tail.x + SNAKE_BLOCK.WIDTH
    let y = tail.y - SNAKE_BLOCK.HEIGHT

    if ([KEYBOARD.S].includes(key)) {
      x = tail.x
      y = tail.y - SNAKE_BLOCK.HEIGHT
    }
    if ([KEYBOARD.A].includes(key)) {
      x = tail.x + SNAKE_BLOCK.WIDTH
      y = tail.y
    }
    if ([KEYBOARD.W].includes(key)) {
      x = tail.x
      y = tail.y + SNAKE_BLOCK.HEIGHT
    }
    if ([KEYBOARD.D].includes(key)) {
      x = tail.x - SNAKE_BLOCK.WIDTH
      y = tail.y
    }

    snake.value.push({y, x})
  }

  const move = (): void => {
    const head: ICoordinates = { x: snake.value[0].x, y: snake.value[0].y };

    if ([KEYBOARD.D].includes(activeKey.value)) {
      head.x = (head.x + SNAKE_BLOCK.WIDTH) % SCENE.WIDTH;
    }
    if ([KEYBOARD.A].includes(activeKey.value)) {
      head.x = head.x - SNAKE_BLOCK.WIDTH < 0 ? SCENE.WIDTH - SNAKE_BLOCK.WIDTH : head.x - SNAKE_BLOCK.WIDTH;
    }
    if ([KEYBOARD.W].includes(activeKey.value)) {
      head.y = head.y - SNAKE_BLOCK.HEIGHT < 0 ? SCENE.HEIGHT - SNAKE_BLOCK.HEIGHT : head.y - SNAKE_BLOCK.HEIGHT;
    }
    if ([KEYBOARD.S].includes(activeKey.value)) {
      head.y = (head.y + SNAKE_BLOCK.HEIGHT) % SCENE.HEIGHT;
    }

    snake.value.unshift(head);
    snake.value.pop();
  };

  const resetSnake = () => {
    snake.value = [{x: 0, y: 0}]
    activeKey.value = ''
  }

  return {
    snake,
    activeKey,
    move,
    drawSnake,
    increaseSnake,
    resetSnake,
    addKeysListeners,
    removeKeysListeners
  }
}