import { GSAPAnimationSettings } from './AnimationSettings.mjs';

export class Timeline {}

export class GSAPTimeline extends Timeline {
  constructor() {
    super();
    this.timeline = gsap.timeline();
  }

  addAnimation({ node, directionX, directionY, stagger, label }) {
    if (node == null) return;

    this.timeline.fromTo(
      node,
      {
        x: `${directionX}${GSAPAnimationSettings.repositioning}`,
        y: `${directionY}${GSAPAnimationSettings.repositioning}`,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: GSAPAnimationSettings.duration,
        stagger: stagger,
        ease: GSAPAnimationSettings.timingFunction,
      },
      label
    );
  }

  addScrollTrigger({ trigger, start }) {
    if (trigger == null || start == null) return;

    ScrollTrigger.create({
      animation: this.timeline,
      trigger: trigger,
      start: start,
      toggleActions: 'play pause resume pause',
      markers: GSAPAnimationSettings.markers,
    });
  }

  addLabelToTimeline({ label }) {
    if (label == null) return;

    this.timeline.add(label);
  }
}
