interface Scale {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

interface DomElements {
  root: HTMLHtmlElement;
  relativeDisplays: HTMLLIElement[];
  absoluteDisplays: HTMLLIElement[];
  baseSizeScale: HTMLInputElement;
  scaleToggles: HTMLInputElement[];
}

interface Model {
  domElements: DomElements;
  baseSize: number;
  relativeScale: Scale;
  absoluteScale: Scale;
  ratio: number;
}

enum Msg {
  UpdateBaseSize = 'UPDATE_BASE_SIZE',
  UpdateDisplay = 'UPDATE_DISPLAY',
  UpdateRatio = 'UPDATE_RATIO',
  UpdateScale = 'UPDATE_SCALE',
  UpdateWithExponentialScale = 'UPDATE_WITH_EXPONENTIAL_SCALE',
  UpdateWithBrassScale = 'UPDATE_WITH_BRASS_SCALE',
  UpdateWithLinearScale = 'UPDATE_WITH_LINEAR_SCALE',
}

declare global {
  interface Window {
    Model: Model;
  }
}

export { Scale, Model, DomElements, Msg };
