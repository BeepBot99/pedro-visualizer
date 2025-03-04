import { gsap } from "gsap";

let paused = $state(true);

export const isPaused = () => paused;

const timer = gsap.timeline({
  repeat: -1,
  paused: true
});
export default timer;

export function pause() {
  paused = true;
  timer.pause();
}

export function play() {
  paused = false;
  timer.play();
}

export function setProgress(progress: number) {
  pause();
  timer.progress(progress);
}
