import { Scale } from './types';
import { exponentialScaleComputed, exponentialScaleRelative } from './scale';

(() => {
  const domRoot = document.documentElement;
  const spaceSize = parseInt(getComputedStyle(domRoot).getPropertyValue(`--desktop-font-size`));

  const relativeDisplayNodes = document.querySelectorAll('[data-behavior~="get-relative-size"]');
  const computedDisplayNodes = document.querySelectorAll('[data-behavior~="get-actual-size"]');
  const relativeDisplayElements = Array.from(relativeDisplayNodes);
  const computedDisplayElements = Array.from(computedDisplayNodes);

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
    const relativeScale = exponentialScaleRelative(spaceSize, ratio);
    const computedScale = exponentialScaleComputed(spaceSize, ratio);

    updateCustomProperties(relativeScale);
    updateDisplaySizes(relativeScale, relativeDisplayElements, ' rem');
    updateDisplaySizes(computedScale, computedDisplayElements, ' px');
  }

  Array.from(document.querySelectorAll('[data-behavior~="get-new-scale"]')).map(input => {
    input.addEventListener('change', toggleScale);
  });
})();
