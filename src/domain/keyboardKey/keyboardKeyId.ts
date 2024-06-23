import { Brand } from "../brand";
import { FilledString, assertFilledString } from "../filledString";

const typeName = "KeyboardKeyId";
export type KeyboardKeyId = Brand<FilledString, typeof typeName>;

export function assertKeyboardKeyId(v: string): asserts v is KeyboardKeyId {
  assertFilledString(v);
}

export const asKeyboardKeyId = (v: string): KeyboardKeyId => {
  assertKeyboardKeyId(v);
  return v;
};
