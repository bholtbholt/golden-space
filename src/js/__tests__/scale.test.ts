import {
  exponentialScaleComputed,
  exponentialScaleRelative,
  goldenScaleComputed,
  goldenScaleRelative,
  linearScaleComputed,
  linearScaleRelative,
} from '../scale';

test('[exponentialScaleComputed] returns an exponential scale', () => {
  const expectedResult = {
    xxs: 1,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
    xxl: 64,
  };

  expect(exponentialScaleComputed(16)).toEqual(expectedResult);
});

test('[exponentialScaleRelative] returns a relative exponential scale', () => {
  const expectedResult = {
    xxs: 0.07,
    xs: 0.13,
    sm: 0.25,
    md: 0.5,
    lg: 1,
    xl: 2,
    xxl: 4,
  };

  expect(exponentialScaleRelative(16)).toEqual(expectedResult);
});

test('[goldenScaleComputed] returns a golden ratio scale', () => {
  const expectedResult = {
    xxs: 3.78,
    xs: 6.11,
    sm: 9.89,
    md: 16,
    lg: 25.89,
    xl: 41.89,
    xxl: 67.78,
  };

  expect(goldenScaleComputed(16)).toEqual(expectedResult);
});

test('[goldenScaleRelative] returns a relative golden ratio scale', () => {
  const expectedResult = {
    xxs: 0.23,
    xs: 0.38,
    sm: 0.62,
    md: 1,
    lg: 1.62,
    xl: 2.62,
    xxl: 4.24,
  };

  expect(goldenScaleRelative(16)).toEqual(expectedResult);
});

test('[linearScaleComputed] returns a linear scale', () => {
  const expectedResult = {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 28,
  };

  expect(linearScaleComputed(16)).toEqual(expectedResult);
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

  expect(linearScaleRelative(16)).toEqual(expectedResult);
});
