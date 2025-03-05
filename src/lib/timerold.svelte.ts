import { gsap } from "gsap";

let paused = $state(true);

export const isPaused = () => paused;

const timer = gsap.timeline({
  repeat: -1,
  paused: true
});

export function destroy() {
  timer.pause();
  paused = true;
  timer.progress(0);
}
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
