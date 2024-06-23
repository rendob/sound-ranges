import { extend } from "../extend";

type ArrayExt = typeof arrayExt;
declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> extends ArrayExt {}
}

const arrayExt = {
  findLast: function <T>(
    this: Array<T>,
    predicate: (value: T, index: number, array: T[]) => boolean,
  ): T | undefined {
    for (let i = this.length - 1; i >= 0; i--) {
      if (predicate(this[i], i, this)) return this[i];
    }
    return undefined;
  },
};

extend(Array, arrayExt);
