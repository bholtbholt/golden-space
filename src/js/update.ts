import { Scale, Msg, Model, DomElements } from './types';
import {
  brassScaleAbsolute,
  brassScaleRelative,
  exponentialScaleAbsolute,
  exponentialScaleRelative,
} from './scale';

interface Params {
  size?: number;
  ratio?: number;
  scale?: string;
}

export function update(message: Msg, params?: Params): Model {
  const dom = window.Model.domElements;
  // Model Properties for "local" update functions
  let baseSize: number;
  let relativeScale: Scale;
  let absoluteScale: Scale;
  let ratio: number;

  switch (message) {
    case 'UPDATE_RATIO':
      window.Model.ratio = params.ratio || 0;

      update(Msg.UpdateScale);
      break;

    case 'UPDATE_SCALE':
      if (window.Model.ratio === 0) {
        update(Msg.UpdateWithBrassScale);
      } else {
        update(Msg.UpdateWithExponentialScale);
      }
      break;

    case 'UPDATE_WITH_BRASS_SCALE':
      baseSize = window.Model.baseSize;
      relativeScale = brassScaleRelative();
      absoluteScale = brassScaleAbsolute(baseSize);
      window.Model.relativeScale = relativeScale;
      window.Model.absoluteScale = absoluteScale;

      Object.keys(relativeScale).map(key => {
        dom.root.style.setProperty(`--space-${key}`, `${relativeScale[key]}rem`);
      });

      update(Msg.UpdateDisplay);
      break;

    case 'UPDATE_WITH_EXPONENTIAL_SCALE':
      baseSize = window.Model.baseSize;
      ratio = window.Model.ratio;
      relativeScale = exponentialScaleRelative(baseSize, ratio);
      absoluteScale = exponentialScaleAbsolute(baseSize, ratio);
      window.Model.relativeScale = relativeScale;
      window.Model.absoluteScale = absoluteScale;

      Object.keys(relativeScale).map(key => {
        dom.root.style.setProperty(`--space-${key}`, `${relativeScale[key]}rem`);
      });

      update(Msg.UpdateDisplay);
      break;

    case 'UPDATE_BASE_SIZE':
      const desktopSize = params.size || 18;
      const mobileSize = desktopSize - 4;
      dom.root.style.setProperty('--desktop-space-size', `${desktopSize}px`);
      dom.root.style.setProperty('--mobile-space-size', `${mobileSize}px`);
      window.Model.baseSize = desktopSize;

      update(Msg.UpdateScale);
      break;

    case 'UPDATE_DISPLAY':
      dom.relativeDisplays.map((element: HTMLLIElement) => {
        const size = element.dataset.scale;
        element.innerHTML = window.Model.relativeScale[size] + ' rem';
      });
      dom.absoluteDisplays.map((element: HTMLLIElement) => {
        const size = element.dataset.scale;
        element.innerHTML = window.Model.absoluteScale[size] + ' px';
      });
      break;

    default:
      break;
  }
  return window.Model;
}
