import { Scale } from './types';
import { exponentialScaleAbsolute, exponentialScaleRelative } from './scale';

(() => {
  const domRoot = document.documentElement;

  const relativeDisplayNodes = document.querySelectorAll('[data-behavior~="get-relative-size"]');
  const absoluteDisplayNodes = document.querySelectorAll('[data-behavior~="get-absolute-size"]');
  const relativeDisplayElements = Array.from(relativeDisplayNodes);
  const absoluteDisplayElements = Array.from(absoluteDisplayNodes);

  function getDesktopBaseSize(): number {
    return parseInt(getComputedStyle(domRoot).getPropertyValue(`--desktop-font-size`)) || 18;
  }

  function updateDesktopScale(event) {
    const size = event.target.value;
    domRoot.style.setProperty('--desktop-font-size', `${size}px`);
  }

  function updateCustomProperties(scale: Scale) {
    Object.keys(scale).map(key => {
      domRoot.style.setProperty(`--space-${key}`, `${scale[key]}rem`);
    });
  }

  function updateDisplaySizes(scale: Scale, elements: any[], units: string) {
    elements.map(element => {
      const size = element.dataset.scale;
      element.innerHTML = scale[size] + units;
    });
  }

  function toggleScale(event) {
    const ratio = event.target.value;
    const baseSize = getDesktopBaseSize();
    const relativeScale = exponentialScaleRelative(baseSize, ratio);
    const absoluteScale = exponentialScaleAbsolute(baseSize, ratio);

    updateCustomProperties(relativeScale);
    updateDisplaySizes(relativeScale, relativeDisplayElements, ' rem');
    updateDisplaySizes(absoluteScale, absoluteDisplayElements, ' px');
  }

  Array.from(document.querySelectorAll('[data-behavior~="get-new-scale"]')).map(input => {
    input.addEventListener('change', toggleScale);
  });
  document
    .querySelector('[data-behavior~="change-base-desktop"]')
    .addEventListener('change', updateDesktopScale);
})();

// Create initApp
// Binds all the listeners
// Builds a model from the current variables
// Updates the displays

// On any event
// the bound function calculates a value
// sends it to the update function

// Update
// holds the current model
// gets the new model
// Updates displays, etc
// Makes destructive changes

// switch/case branch that handles all the updates?
