import {
  exponentialScaleAbsolute,
  exponentialScaleRelative,
  linearScaleAbsolute,
  linearScaleRelative,
} from '../scale';

test('[exponentialScaleAbsolute] returns an exponential scale', () => {
  const expectedResult = {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 32,
    xl: 64,
    xxl: 128,
  };

  expect(exponentialScaleAbsolute(16, 2)).toEqual(expectedResult);
});

test('[exponentialScaleRelative] returns a relative exponential scale', () => {
  const expectedResult = {
    xxs: 0.13,
    xs: 0.25,
    sm: 0.5,
    md: 1,
    lg: 2,
    xl: 4,
    xxl: 8,
  };

  expect(exponentialScaleRelative(16, 2)).toEqual(expectedResult);
});

test('[exponentialScaleAbsolute] returns a golden ratio scale', () => {
  const expectedResult = {
    xxs: 3.78,
    xs: 6.11,
    sm: 9.89,
    md: 16,
    lg: 25.89,
    xl: 41.89,
    xxl: 67.78,
  };

  expect(exponentialScaleAbsolute(16, 1.618)).toEqual(expectedResult);
});

test('[exponentialScaleRelative] returns a relative golden ratio scale', () => {
  const expectedResult = {
    xxs: 0.23,
    xs: 0.38,
    sm: 0.62,
    md: 1,
    lg: 1.62,
    xl: 2.62,
    xxl: 4.24,
  };

  expect(exponentialScaleRelative(16, 1.618)).toEqual(expectedResult);
});

test('[linearScaleAbsolute] returns a linear scale', () => {
  const expectedResult = {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 28,
  };

  expect(linearScaleAbsolute(16, 0.25)).toEqual(expectedResult);
});

test('[linearScaleRelative] returns a relative linear scale', () => {
  const expectedResult = {
    xxs: 0.25,
    xs: 0.5,
    sm: 0.75,
    md: 1,
    lg: 1.25,
    xl: 1.5,
    xxl: 1.75,
  };

  expect(linearScaleRelative(16, 0.25)).toEqual(expectedResult);
});
