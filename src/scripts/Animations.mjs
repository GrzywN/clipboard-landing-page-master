import { GSAPAnimationSettings } from './AnimationSettings.mjs';
import { GSAPTimeline } from './Timeline.mjs';

export class Animations {
  constructor(domElements) {
    this.domElements = domElements;
  }

  initializeAnimations() {
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

export class GSAPAnimations extends Animations {
  constructor(domElements) {
    super(domElements);
  }

  animateHeader(introductionElement, buttonWrapperElement) {
    if (introductionElement == null || buttonWrapperElement == null) return;

    const introduction = introductionElement;
    const leftButton = buttonWrapperElement.children[0];
    const rightButton = buttonWrapperElement.children[1];

    const timeline = new GSAPTimeline();
    const LABEL = 'buttons';

    timeline.addAnimation({
      node: introduction,
      directionY: '-=',
      stagger: GSAPAnimationSettings.stagger,
    });

    timeline.addLabelToTimeline({ label: LABEL });

    timeline.addAnimation({ node: leftButton, directionX: '-=', label: LABEL });
    timeline.addAnimation({ node: rightButton, directionX: '+=', label: LABEL });
  }

  animateIntroductions(introductionsElement) {
    if (introductionsElement == null) return;

    const introductions = introductionsElement;

    for (let i = 0; i < introductions.length - 1; i++) {
      const timeline = new GSAPTimeline();
      timeline.addAnimation({
        node: introductions[i].children,
        directionY: '-=',
        stagger: GSAPAnimationSettings.stagger,
      });
      timeline.addScrollTrigger({
        trigger: introductions[i].parentNode,
        start: GSAPAnimationSettings.start,
      });
    }
  }

  animateImageColumnSection(imageElement, cardsElements) {
    if (imageElement == null || cardsElements == null) return;

    const image = imageElement;
    const cards = cardsElements;

    const timeline = new GSAPTimeline();

    timeline.addAnimation({
      node: image,
      directionX: '-=',
    });
    timeline.addAnimation({
      node: cards,
      stagger: GSAPAnimationSettings.stagger,
      directionX: '+=',
    });

    timeline.addScrollTrigger({
      trigger: image.parentNode,
      start: GSAPAnimationSettings.start,
    });
  }

  animateImageSection(imageElement) {
    if (imageElement == null) return;

    const image = imageElement;

    const timeline = new GSAPTimeline();

    timeline.addAnimation({ node: image, directionY: '+=' });
    timeline.addScrollTrigger({ trigger: image, start: GSAPAnimationSettings.start });
  }

  animateGridCardsSection(cardsElements) {
    if (cardsElements == null) return;

    const cards = cardsElements;

    const leftCard = cards[0];
    const centerCard = cards[1];
    const rightCard = cards[2];

    const timeline = new GSAPTimeline();

    timeline.addLabelToTimeline({ label: 'outerCards' });

    timeline.addAnimation({ node: leftCard, directionX: '-=', label: 'outerCards' });
    timeline.addAnimation({ node: rightCard, directionX: '+=', label: 'outerCards' });
    timeline.addAnimation({ node: centerCard, directionY: '+=' });

    timeline.addScrollTrigger({ trigger: cards, start: GSAPAnimationSettings.start });
  }

  animateButtonSection(introductionsElement, buttonWrapperElement) {
    if (buttonWrapperElement == null) return;

    const introductions = introductionsElement;
    const introduction = introductions[introductions.length - 1];
    const leftButton = buttonWrapperElement.children[0];
    const rightButton = buttonWrapperElement.children[1];

    const LABEL = 'buttons';

    const timeline = new GSAPTimeline();

    timeline.addLabelToTimeline({ label: LABEL });

    timeline.addAnimation({ node: introduction, directionY: '+=', label: LABEL });
    timeline.addAnimation({ node: leftButton, directionX: '-=', label: LABEL });
    timeline.addAnimation({ node: rightButton, directionX: '+=', label: LABEL });

    timeline.addScrollTrigger({
      trigger: buttonWrapperElement.parentNode,
      start: GSAPAnimationSettings.higherStart,
    });
  }
}
