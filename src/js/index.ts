import { Model, DomElements, Msg } from './types';
import { update } from './update';

// init function
(() => {
  //////////////////////////////////////
  // Build DOM elements for the model
  //////////////////////////////////////

  const domRoot = document.documentElement;
  const relativeDisplayElements = Array.from(
    document.querySelectorAll('[data-behavior~="get-relative-size"]'),
  );
  const absoluteDisplayElements = Array.from(
    document.querySelectorAll('[data-behavior~="get-absolute-size"]'),
  );
  const baseSizeScale = document.querySelector('[data-behavior~="change-base-size"]');
  const scaleToggles = Array.from(document.querySelectorAll('[data-behavior~="get-new-scale"]'));

  const domElements: DomElements = {
    root: domRoot as HTMLHtmlElement,
    relativeDisplays: relativeDisplayElements as HTMLLIElement[],
    absoluteDisplays: absoluteDisplayElements as HTMLLIElement[],
    baseSizeScale: baseSizeScale as HTMLInputElement,
    scaleToggles: scaleToggles as HTMLInputElement[],
  };

  //////////////////////////////////////
  // Initialize the model
  //////////////////////////////////////

  const initModel: Model = {
    domElements,
    baseSize: 16,
    relativeScale: {
      xxs: 0.2,
      xs: 0.4,
      sm: 0.8,
      md: 1,
      lg: 1.5,
      xl: 2,
      xxl: 4,
    },
    absoluteScale: {
      xxs: 3.2,
      xs: 7.4,
      sm: 12.8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 64,
    },
    ratio: 0,
  };
  window.Model = initModel;

  //////////////////////////////////////
  // Bind Listeners
  //////////////////////////////////////

  domElements.scaleToggles.map(input => {
    input.addEventListener('change', function() {
      const ratio = Number(this.value);
      update(Msg.UpdateRatio, { ratio });
    });
  });

  domElements.baseSizeScale.addEventListener('change', function() {
    const size = Number(this.value);
    update(Msg.UpdateBaseSize, { size });
  });

  update(Msg.UpdateDisplay);
})();
