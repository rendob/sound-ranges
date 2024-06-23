import { Brand } from "../brand";
import { TypeAssertionError } from "../error/appError";

const typeName = "FilledString";
export type FilledString = Brand<string, typeof typeName>;

export function assertFilledString(v: string): asserts v is FilledString {
  if (v.length === 0) {
    throw new TypeAssertionError(typeName, "value should not be empty!");
  }
}

export const asFilledString = (v: string): FilledString => {
  assertFilledString(v);
  return v;
};
