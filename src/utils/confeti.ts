// @ts-nocheck

export let duration = 15 * 1000;
export let animationEnd = Date.now() + duration;
export let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
