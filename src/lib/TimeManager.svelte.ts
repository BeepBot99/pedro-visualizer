import { gsap } from "gsap";

export class TimeManager {
  readonly timeline: gsap.core.Timeline;
  paused: boolean = $state(true);

  constructor() {
    this.timeline = gsap.timeline({
      repeat: -1,
      paused: true
    });
  }

  // Arrow function for pause method
  pause = () => {
    this.paused = true;
    this.timeline.pause();
  };

  // Arrow function for play method
  play = () => {
    this.paused = false;
    this.timeline.play();
  };

  // Arrow function for skipTo method
  skipTo = (progress: number) => {
    this.pause();
    this.timeline.progress(progress);
  };
}
