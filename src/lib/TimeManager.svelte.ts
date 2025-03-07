import { gsap } from "gsap";
type Timeline = gsap.core.Timeline;

export class TimeManager {
  readonly timeline: Timeline;
  paused: boolean = $state(true);
  private onUpdate: ((progress: number) => void)[] = [];

  constructor() {
    this.timeline = gsap.timeline({
      repeat: -1,
      paused: true,
      onUpdate: () => {
        this.onUpdate.forEach((callback) => callback(this.timeline.progress()));
      }
    });
  }

  addOnUpdate = (callback: (progress: number) => void) => {
    this.onUpdate.push(callback);
  };

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

  toggle = () => {
    this.paused = !this.paused;
    if (this.paused) {
      this.timeline.pause();
    } else {
      this.timeline.play();
    }
  };

  // Arrow function for skipTo method
  skipTo = (progress: number) => {
    this.pause();
    this.timeline.progress(progress);
  };

  rewind = () => {
    this.timeline.progress(this.timeline.progress() <= 0.2 ? 0 : this.timeline.progress() - 0.2);
  };

  fastForward = () => {
    this.timeline.progress(this.timeline.progress() >= 0.8 ? 1 : this.timeline.progress() + 0.2);
  };
}
