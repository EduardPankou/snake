import {ref} from "vue";
import {KEYBOARD, KEYBOARD_LIST} from "../helpers/constants";

export default function useKeyboard() {
  const activeKey = ref<string>('');

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === ' ') {
      activeKey.value = ''
      return;
    }
    const canMoveUp: boolean = event.key === KEYBOARD.W && activeKey.value !== KEYBOARD.S
    const canMoveDown: boolean = event.key === KEYBOARD.S && activeKey.value !== KEYBOARD.W
    const canMoveLeft: boolean = event.key === KEYBOARD.A && activeKey.value !== KEYBOARD.D
    const canMoveRight: boolean = event.key === KEYBOARD.D && activeKey.value !== KEYBOARD.A

    const canMove: boolean = ((): boolean => {
      switch (event.key) {
        case KEYBOARD.W: return activeKey.value !== KEYBOARD.S
        case KEYBOARD.S: return activeKey.value !== KEYBOARD.W
        case KEYBOARD.A: return activeKey.value !== KEYBOARD.D
        case KEYBOARD.D: return activeKey.value !== KEYBOARD.A
      }
      return canMoveUp && canMoveDown && canMoveLeft && canMoveRight
    })()

    if (!KEYBOARD_LIST.includes(event.key) || !canMove) return

    activeKey.value = event.key;
  };

  const addKeysListeners = (): void => {
    window.addEventListener("keydown", handleKeyDown);
  }

  const removeKeysListeners = (): void => {
    window.removeEventListener("keydown", handleKeyDown);
  }

  return {
    activeKey,
    addKeysListeners,
    removeKeysListeners
  }
}