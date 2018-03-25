import { Scale } from './types';

function roundDecimals(num: number): number {
  return Math.round(num * 100) / 100;
}

function exponentialScaleComputed(base: number, ratio: number): Scale {
  const md = base;
  const sm = roundDecimals(md / ratio);
  const xs = roundDecimals(sm / ratio);
  const xxs = roundDecimals(xs / ratio);
  const lg = roundDecimals(md * ratio);
  const xl = roundDecimals(lg * ratio);
  const xxl = roundDecimals(xl * ratio);

  return {
    xxs,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  };
}

function exponentialScaleRelative(base: number, ratio: number): Scale {
  const md = base / base;
  const sm = roundDecimals(md / ratio);
  const xs = roundDecimals(sm / ratio);
  const xxs = roundDecimals(xs / ratio);
  const lg = roundDecimals(md * ratio);
  const xl = roundDecimals(lg * ratio);
  const xxl = roundDecimals(xl * ratio);

  return {
    xxs,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  };
}

function linearScaleComputed(base: number): Scale {
  const distance = base * 0.25;
  const md = base;
  const sm = md - distance;
  const xs = sm - distance;
  const xxs = xs - distance;
  const lg = md + distance;
  const xl = lg + distance;
  const xxl = xl + distance;

  return {
    xxs,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  };
}

function linearScaleRelative(base: number): Scale {
  const distance = 0.25;
  const md = base / base;
  const sm = md - distance;
  const xs = sm - distance;
  const xxs = xs - distance;
  const lg = md + distance;
  const xl = lg + distance;
  const xxl = xl + distance;

  return {
    xxs,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  };
}

export {
  exponentialScaleComputed,
  exponentialScaleRelative,
  linearScaleComputed,
  linearScaleRelative,
};
