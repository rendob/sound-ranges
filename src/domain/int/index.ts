import { Brand } from "../brand";
import { TypeAssertionError } from "../error/appError";

const typeName = "Int";
export type Int = Brand<number, typeof typeName>;

export function assertInt(v: number): asserts v is Int {
  if (!Number.isInteger(v)) {
    throw new TypeAssertionError(typeName, `${v} should be integer!`);
  }
}

export const asInt = (v: number): Int => {
  assertInt(v);
  return v;
};
