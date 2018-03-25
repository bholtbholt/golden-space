import { Scale } from './types';
import {
  exponentialScaleComputed,
  exponentialScaleRelative,
  goldenScaleComputed,
  goldenScaleRelative,
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

  function toggleGolden(event) {
    updateCustomProperties(goldenScaleRelative(spaceSize));
    console.log('golden relative', goldenScaleRelative(spaceSize));
    console.log('golden computed', goldenScaleComputed(spaceSize));
  }

  function toggleExponential(event) {
    updateCustomProperties(exponentialScaleRelative(spaceSize));
    console.log('exponential relative', exponentialScaleRelative(spaceSize));
    console.log('exponential computed', exponentialScaleComputed(spaceSize));
  }

  // Bindings
  document.querySelector('[data-behavior~="toggle-linear"]').addEventListener('change', toggleLinear);
  document.querySelector('[data-behavior~="toggle-golden"]').addEventListener('change', toggleGolden);
  document.querySelector('[data-behavior~="toggle-exponential"]').addEventListener('change', toggleExponential);
})();
