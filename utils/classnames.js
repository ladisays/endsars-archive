export const buildClassNames = (...classNames) =>
  classNames
    .filter((className) => className)
    .join(' ')
    .trim();

export const build = () => {};
