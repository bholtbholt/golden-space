import { Scale, Msg, Model } from './types';
import { exponentialScaleAbsolute, exponentialScaleRelative } from './scale';

interface Params {
  size?: number;
  ratio?: number;
  scale?: string;
}

function update(message: Msg, params?: Params) {
  const dom = window.Model.domElements;

  switch (message) {
    case 'UPDATE_RATIO':
      window.Model.ratio = params.ratio;

      update(Msg.UpdateScale);
      break;

    case 'UPDATE_SCALE':
      const baseSize = window.Model.desktopFontSize;
      const ratio = window.Model.ratio;
      const relativeScale: Scale = exponentialScaleRelative(baseSize, ratio);
      const absoluteScale: Scale = exponentialScaleAbsolute(baseSize, ratio);
      window.Model.relativeScale = relativeScale;
      window.Model.absoluteScale = absoluteScale;

      Object.keys(relativeScale).map(key => {
        dom.root.style.setProperty(`--space-${key}`, `${relativeScale[key]}rem`);
      });

      update(Msg.UpdateDisplay);
      break;

    case 'UPDATE_DESKTOP_BASE_SIZE':
      const size = params.size;
      dom.root.style.setProperty('--desktop-font-size', `${size}px`);
      window.Model.desktopFontSize = size;

      update(Msg.UpdateScale);
      break;

    case 'UPDATE_MOBILE_BASE_SIZE':
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
}

export { update };
