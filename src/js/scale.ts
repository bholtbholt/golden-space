import { Scale } from './types';

function roundDecimals(num: number): number {
  return Math.round(num * 100) / 100;
}

function exponentialScaleComputed(base: number): Scale {
  const ratio = 2;
  const lg = base;
  const md = roundDecimals(lg / ratio);
  const sm = roundDecimals(md / ratio);
  const xs = roundDecimals(sm / ratio);
  const xxs = roundDecimals(xs / ratio);
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

function exponentialScaleRelative(base: number): Scale {
  const ratio = 2;
  const lg = base / base;
  const md = roundDecimals(lg / ratio);
  const sm = roundDecimals(md / ratio);
  const xs = roundDecimals(sm / ratio);
  const xxs = roundDecimals(xs / ratio);
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

function goldenScaleComputed(base: number): Scale {
  const ratio = 1.618;
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

function goldenScaleRelative(base: number): Scale {
  const ratio = 1.618;
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
  goldenScaleComputed,
  goldenScaleRelative,
  linearScaleComputed,
  linearScaleRelative,
};
