import { Scale } from './types';
import {
  exponentialScaleComputed,
  exponentialScaleRelative,
  linearScaleComputed,
  linearScaleRelative,
} from './scale';

(() => {
  const domRoot = document.documentElement;
  const spaceSize = parseInt(getComputedStyle(domRoot).getPropertyValue(`--desktop-font-size`));

  function updateCustomProperties(scale: Scale) {
    Object.keys(scale).map(key => {
      domRoot.style.setProperty(`--space-${key}`, `${scale[key]}rem`);
    });
  }

  function toggleLinear(event) {
    updateCustomProperties(linearScaleRelative(spaceSize));
    console.log('linear relative', linearScaleRelative(spaceSize));
    console.log('linear computed', linearScaleComputed(spaceSize));
  }

  function toggleScale(event) {
    const ratio = event.target.value;
    updateCustomProperties(exponentialScaleRelative(spaceSize, ratio));
    console.log('exponential relative', exponentialScaleRelative(spaceSize, ratio));
    console.log('exponential computed', exponentialScaleComputed(spaceSize, ratio));
  }

  // Bindings
  document
    .querySelector('[data-behavior~="toggle-linear"]')
    .addEventListener('change', toggleLinear);

  Array.from(document.querySelectorAll('[data-behavior~="get-new-scale"]')).map(input => {
    input.addEventListener('change', toggleScale);
  });
})();
