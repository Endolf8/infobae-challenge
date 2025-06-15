type Arg = string | undefined | null | false;

/** Joins multiple classNames in one string. */
const cn = (...args: Arg[]): string => args.join(' ');

export default cn;
