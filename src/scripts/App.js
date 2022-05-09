import { GSAPAnimations } from './modules/Animations.mjs';

gsap.registerPlugin(ScrollTrigger);

const domElements = {
  headerIntroduction: [
    document.querySelector('.header__logo'),
    document.querySelector('.header__heading'),
    document.querySelector('.header__paragraph'),
  ],
  headerButtonWrapper: document.querySelector('.header__button-wrapper'),

  introductions: document.querySelectorAll('.introduction'),

  imageColumnSectionImage: document.querySelector('.image-column-section__img'),
  imageColumnSectionCards: document.querySelectorAll('.image-column-section__container'),

  imageSectionImage: document.querySelector('.section__img'),

  gridCards: document.querySelectorAll('.grid .card'),

  sectionButtonWrapper: document.querySelector('.section__button-wrapper'),
};

const animations = new GSAPAnimations(domElements);

animations.initializeAnimations();
