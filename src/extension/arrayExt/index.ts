import { asInt, Int } from "../../domain/int";
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

/**
 * 等差数列の作成
 *
 * @param start 最初の要素
 * @param end 最後の要素 (inclusive)
 * @param step 公差
 */
export const createArithmeticSequence = (
  start: Int,
  end: Int,
  step: Int = asInt(1),
): Int[] => {
  const length = Math.floor((end - start) / step) + 1;
  return new Array(length)
    .fill(0)
    .map((_, index) => asInt(start + index * step));
};
