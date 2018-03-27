import { Model, DomElements, Msg } from '../types';
import { update } from '../update';
import { brassScaleRelative } from '../scale';

function createDisplayElements(): HTMLLIElement[] {
  const range = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

  return range.map(size => {
    const displayElement = document.createElement('li');
    displayElement.dataset.scale = size;
    return displayElement;
  });
}

const initModel: Model = {
  domElements: {
    root: document.documentElement as HTMLHtmlElement,
    relativeDisplays: createDisplayElements() as HTMLLIElement[],
    absoluteDisplays: createDisplayElements() as HTMLLIElement[],
    baseSizeScale: document.createElement('input') as HTMLInputElement,
    exponentialToggles: [document.createElement('input')] as HTMLInputElement[],
  },
  baseSize: 16,
  relativeScale: {
    xxs: 0.23,
    xs: 0.38,
    sm: 0.62,
    md: 1,
    lg: 1.62,
    xl: 2.62,
    xxl: 4.24,
  },
  absoluteScale: {
    xxs: 3.78,
    xs: 6.11,
    sm: 9.89,
    md: 16,
    lg: 25.89,
    xl: 41.89,
    xxl: 67.78,
  },
  ratio: 1.618,
};
window.Model = initModel;

test('[UPDATE_DISPLAY] Updates the values of the relative displays', () => {
  const scale = {
    xxs: 0.23,
    xs: 0.38,
    sm: 0.62,
    md: 1,
    lg: 1.62,
    xl: 2.62,
    xxl: 4.24,
  };
  const relativeDisplays = Object.keys(scale).map(size => {
    const displayElement = document.createElement('li');
    displayElement.dataset.scale = size;
    displayElement.innerHTML = `${scale[size]} rem`;
    return displayElement;
  });
  const expectedResult = {
    domElements: {
      relativeDisplays,
    },
  };

  expect(update(Msg.UpdateDisplay)).toMatchObject(expectedResult);
});

test('[UPDATE_DISPLAY] Updates the values of the absolute displays', () => {
  const scale = {
    xxs: 3.78,
    xs: 6.11,
    sm: 9.89,
    md: 16,
    lg: 25.89,
    xl: 41.89,
    xxl: 67.78,
  };
  const absoluteDisplays = Object.keys(scale).map(size => {
    const displayElement = document.createElement('li');
    displayElement.dataset.scale = size;
    displayElement.innerHTML = `${scale[size]} rem`;
    return displayElement;
  });
  const expectedResult = {
    domElements: {
      absoluteDisplays,
    },
  };

  expect(update(Msg.UpdateDisplay)).toMatchObject(expectedResult);
});

test('[UPDATE_RATIO] Updates the model ratio value', () => {
  const expectedResults = {
    ratio: 2,
  };

  expect(update(Msg.UpdateRatio, { ratio: 2 })).toMatchObject(expectedResults);
});

test('[UPDATE_RATIO] Updates the model relative scale', () => {
  const relativeScale = {
    xxs: 0.13,
    xs: 0.25,
    sm: 0.5,
    md: 1,
    lg: 2,
    xl: 4,
    xxl: 8,
  };
  const expectedResults = {
    relativeScale,
  };
  expect(update(Msg.UpdateRatio, { ratio: 2 })).toMatchObject(expectedResults);
});

test('[UPDATE_RATIO] Updates the model absolute scale', () => {
  const absoluteScale = {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 32,
    xl: 64,
    xxl: 128,
  };
  const expectedResults = {
    absoluteScale,
  };
  expect(update(Msg.UpdateRatio, { ratio: 2 })).toMatchObject(expectedResults);
});

test('[UPDATE_RATIO] Updates the model relative scale with brass', () => {
  const relativeScale = brassScaleRelative();
  const expectedResults = {
    relativeScale,
  };
  expect(update(Msg.UpdateRatio, { ratio: 0 })).toMatchObject(expectedResults);
});

test('[UPDATE_BASE_SIZE] Updates the model base size', () => {
  const expectedResults = {
    baseSize: 20,
  };
  expect(update(Msg.UpdateBaseSize, { size: 20 })).toMatchObject(expectedResults);
});
