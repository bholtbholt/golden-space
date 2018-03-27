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
  desktopScale: HTMLInputElement;
  exponentialToggles: HTMLInputElement[];
}

interface Model {
  domElements: DomElements;
  mobileFontSize: number;
  desktopFontSize: number;
  relativeScale: Scale;
  absoluteScale: Scale;
  ratio: number;
}

enum Msg {
  UpdateScale = 'UPDATE_SCALE',
  UpdateDesktopBaseSize = 'UPDATE_DESKTOP_BASE_SIZE',
  UpdateMobileBaseSize = 'UPDATE_MOBILE_BASE_SIZE',
  UpdateDisplay = 'UPDATE_DISPLAY',
  UpdateRatio = 'UPDATE_RATIO',
}

declare global {
  interface Window {
    Model: Model;
  }
}

export { Scale, Model, DomElements, Msg };
