import AnimationSettings from './AnimationSettings.mjs';

export default class Timeline {
  constructor() {
    this.timeline = gsap.timeline();
  }

  addAnimation({ node, directionX, directionY, stagger, label }) {
    if (node == null) return;

    this.timeline.fromTo(
      node,
      {
        x: `${directionX}${AnimationSettings.repositioning}`,
        y: `${directionY}${AnimationSettings.repositioning}`,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: AnimationSettings.duration,
        stagger: stagger,
        ease: AnimationSettings.timingFunction,
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
      markers: AnimationSettings.markers,
    });
  }

  addLabelToTimeline({ label }) {
    if (label == null) return;

    this.timeline.add(label);
  }
}
