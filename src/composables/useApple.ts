import {ref} from "vue";
import {ICoordinates} from "../helpers/types";
import {APPLE, SCENE} from "../helpers/constants";
import {numberGenerator} from "../utils/utils";

interface IApple extends ICoordinates{
  x: number;
  y: number;
  image: HTMLImageElement;
}

export default function useApple() {
  const apple = ref<IApple>({
    x: 0,
    y: 0,
    image: null
  })
  const drawApple = (ctx: CanvasRenderingContext2D): void => {
    if (!apple.value.image) {
      apple.value.image = new Image();
      apple.value.image.src = "/images/apple.svg";
    }

    if (!apple.value.x || !apple.value.y) {
      apple.value.x = numberGenerator(0, SCENE.WIDTH - APPLE.WIDTH)
      apple.value.y = numberGenerator(0, SCENE.HEIGHT - APPLE.HEIGHT)
    }

    ctx.drawImage(
      apple.value.image,
      apple.value.x,
      apple.value.y,
      APPLE.WIDTH,
      APPLE.HEIGHT
    );
  }

  const resetApple = () => {
    apple.value.x = 0
    apple.value.y = 0
  }

  return {
    apple,
    drawApple,
    resetApple
  }
}