import AnimationSettings from './AnimationSettings.mjs';
import Timeline from './Timeline.mjs';

export default class Animations {
  constructor(domElements) {
    this.domElements = domElements;
  }

  static init(domElements) {
    let animations;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ScrollTrigger.matchMedia({
      '(max-width: 56.25em)': () => {
        animations = new AnimationsMobile(domElements);
      },

      '(min-width: 56.25em) and (max-width: 85.375em)': () => {
        animations = new AnimationsTablet(domElements);
      },

      '(min-width: 85.375em)': () => {
        animations = new AnimationsDesktop(domElements);
      },

      all: () => {
        animations.animate();
      },
    });
  }

  animate() {
    this.animateHeader(this.domElements.headerIntroduction, this.domElements.headerButtonWrapper);
    this.animateIntroductions(this.domElements.introductions);
    this.animateImageColumnSection(
      this.domElements.imageColumnSectionImage,
      this.domElements.imageColumnSectionCards
    );
    this.animateImageSection(this.domElements.imageSectionImage);
    this.animateGridCardsSection(this.domElements.gridCards);
    this.animateButtonSection(
      this.domElements.introductions,
      this.domElements.sectionButtonWrapper
    );
  }
}

class AnimationsMobile extends Animations {
  animateHeader(introductionElement, buttonWrapperElement) {
    if (introductionElement == null || buttonWrapperElement == null) return;

    const introduction = introductionElement;
    const leftButton = buttonWrapperElement.children[0];
    const rightButton = buttonWrapperElement.children[1];

    const timeline = new Timeline();
    const LABEL = 'buttons';

    timeline.addAnimation({
      node: introduction,
      directionY: '-=',
      stagger: AnimationSettings.stagger,
    });

    timeline.addLabelToTimeline({ label: LABEL });

    timeline.addAnimation({ node: leftButton, directionX: '-=', label: LABEL });
    timeline.addAnimation({ node: rightButton, directionX: '+=', label: LABEL });
  }

  animateIntroductions(introductionsElement) {
    if (introductionsElement == null) return;

    const introductions = introductionsElement;

    for (let i = 0; i < introductions.length - 1; i++) {
      const timeline = new Timeline();
      timeline.addAnimation({
        node: introductions[i].children,
        directionY: '-=',
        stagger: AnimationSettings.stagger,
      });
      timeline.addScrollTrigger({
        trigger: introductions[i].parentNode,
        start: AnimationSettings.defaultStart,
      });
    }
  }

  animateImageColumnSection(imageElement, cardsElements) {
    if (imageElement == null || cardsElements == null) return;

    const image = imageElement;
    const cards = cardsElements;

    const timeline = new Timeline();

    timeline.addAnimation({
      node: image,
      directionX: '-=',
    });
    timeline.addAnimation({
      node: cards,
      stagger: AnimationSettings.stagger,
      directionX: '+=',
    });

    timeline.addScrollTrigger({
      trigger: image.parentNode,
      start: AnimationSettings.defaultStart,
    });
  }

  animateImageSection(imageElement) {
    if (imageElement == null) return;

    const image = imageElement;

    const timeline = new Timeline();

    timeline.addAnimation({ node: image, directionY: '+=' });
    timeline.addScrollTrigger({ trigger: image, start: AnimationSettings.higherStart });
  }

  animateGridCardsSection(cardsElements) {
    if (cardsElements == null) return;

    const cards = cardsElements;

    const leftCard = cards[0];
    const centerCard = cards[1];
    const rightCard = cards[2];

    const timeline = new Timeline();

    timeline.addAnimation({ node: leftCard, directionX: '-=' });
    timeline.addAnimation({ node: centerCard, directionX: '+=' });
    timeline.addAnimation({ node: rightCard, directionX: '-=' });

    timeline.addScrollTrigger({ trigger: cards, start: AnimationSettings.higherStart });
  }

  animateButtonSection(introductionsElement, buttonWrapperElement) {
    if (introductionsElement == null || buttonWrapperElement == null) return;

    const introductions = introductionsElement;
    const introduction = introductions[introductions.length - 1];
    const leftButton = buttonWrapperElement.children[0];
    const rightButton = buttonWrapperElement.children[1];

    const LABEL = 'buttons';

    const timeline = new Timeline();

    timeline.addLabelToTimeline({ label: LABEL });

    timeline.addAnimation({ node: introduction, directionY: '+=', label: LABEL });
    timeline.addAnimation({ node: leftButton, directionX: '-=', label: LABEL });
    timeline.addAnimation({ node: rightButton, directionX: '+=', label: LABEL });

    timeline.addScrollTrigger({
      trigger: buttonWrapperElement.parentNode,
      start: AnimationSettings.higherStart,
    });
  }
}

class AnimationsTablet extends AnimationsMobile {
  animateGridCardsSection(cardsElements) {
    if (cardsElements == null) return;

    const cards = cardsElements;

    const leftCard = cards[0];
    const centerCard = cards[1];
    const rightCard = cards[2];

    const timeline = new Timeline();

    timeline.addAnimation({ node: leftCard, directionX: '-=', label: 'outerCards' });
    timeline.addAnimation({ node: centerCard, directionX: '+=' });
    timeline.addAnimation({ node: rightCard, directionX: '-=', label: 'outerCards' });

    timeline.addScrollTrigger({ trigger: cards, start: AnimationSettings.defaultStart });
  }
}

class AnimationsDesktop extends AnimationsTablet {
  animateGridCardsSection(cardsElements) {
    if (cardsElements == null) return;

    const cards = cardsElements;

    const leftCard = cards[0];
    const centerCard = cards[1];
    const rightCard = cards[2];

    const timeline = new Timeline();

    const LABEL = 'outerCards';

    timeline.addLabelToTimeline({ label: 'outerCards' });

    timeline.addAnimation({ node: leftCard, directionX: '-=', label: LABEL });
    timeline.addAnimation({ node: rightCard, directionX: '+=', label: LABEL });
    timeline.addAnimation({ node: centerCard, directionY: '+=' });

    timeline.addScrollTrigger({ trigger: cards, start: AnimationSettings.defaultStart });
  }
}
