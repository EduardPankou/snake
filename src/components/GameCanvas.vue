<template>
  <div>Tab W,A,S,D to start game</div>
  <canvas
    ref="canvasRef"
    :width="SCENE.WIDTH"
    :height="SCENE.HEIGHT"
  />
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {SCENE} from "../helpers/constants";
import useGame from "../composables/useGame";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const {
  draw,
  checkCollisions,
  addKeysListeners,
  removeKeysListeners,
  clearIntervalMove,
  intervalMove
} = useGame()

const animate = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  draw(ctx)
  checkCollisions()
  requestAnimationFrame(animate)
};

onMounted(() => {
  animate()
  intervalMove()
  addKeysListeners()
});
onUnmounted(() => {
  removeKeysListeners()
  clearIntervalMove()
});
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
div {
  font: 700 32px/38px Arial;
}
</style>
