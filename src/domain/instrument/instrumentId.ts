import { Brand } from "../brand";
import { FilledString, assertFilledString } from "../filledString";

const typeName = "InstrumentId";
export type InstrumentId = Brand<FilledString, typeof typeName>;

export function assertInstrumentId(v: string): asserts v is InstrumentId {
  assertFilledString(v);
}

export const asInstrumentId = (v: string): InstrumentId => {
  assertInstrumentId(v);
  return v;
};
