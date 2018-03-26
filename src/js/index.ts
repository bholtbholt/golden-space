import { Model, DomElements, Msg } from './types';
import { update } from './update';

(<any>window).Model = {};

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
  const desktopScale = document.querySelector('[data-behavior~="change-base-desktop"]');
  const exponentialToggles = Array.from(
    document.querySelectorAll('[data-behavior~="get-new-scale"]'),
  );

  const domElements: DomElements = {
    root: domRoot as HTMLHtmlElement,
    relativeDisplays: relativeDisplayElements as HTMLLIElement[],
    absoluteDisplays: absoluteDisplayElements as HTMLLIElement[],
    desktopScale: desktopScale as HTMLInputElement,
    exponentialToggles: exponentialToggles as HTMLInputElement[],
  };

  //////////////////////////////////////
  // Initialize the model
  //////////////////////////////////////

  const model: Model = {
    domElements,
    mobileFontSize: 14,
    desktopFontSize: 18,
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
      xxs: 3,
      xs: 7,
      sm: 14,
      md: 18,
      lg: 27,
      xl: 36,
      xxl: 72,
    },
    ratio: 1.618,
  };
  (<any>window).Model = model;

  //////////////////////////////////////
  // Bind Listeners
  //////////////////////////////////////

  domElements.exponentialToggles.map(input => {
    input.addEventListener('change', function() {
      const ratio = parseFloat(this.value);
      update(Msg.UpdateRatio, { ratio });
    });
  });

  domElements.desktopScale.addEventListener('change', function() {
    const size = parseInt(this.value);
    update(Msg.UpdateDesktopBaseSize, { size });
  });

  update(Msg.UpdateDisplay);
})();
