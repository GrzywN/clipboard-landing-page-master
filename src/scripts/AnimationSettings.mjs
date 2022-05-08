export class AnimationSettings {
  static enabled = true;
}

export class GSAPAnimationSettings extends AnimationSettings {
  static repositioning = 100;
  static duration = 0.9;
  static timingFunction = 'ease';
  static stagger = 0.5;
  static start = '-63.63% 20%';
  static higherStart = 'bottom bottom';
  static markers = false;
}
