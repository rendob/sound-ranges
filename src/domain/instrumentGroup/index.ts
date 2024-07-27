import { Brand } from "../brand";
import { TypeAssertionError } from "../error/appError";
import { FilledString } from "../filledString";
import { InstrumentId } from "../instrument/instrumentId";

const typeName = "InstrumentGroup";
type InstrumentGroupType = {
  readonly name: FilledString;
  readonly instrumentIds: InstrumentId[];
};
export type InstrumentGroup = Brand<InstrumentGroupType, typeof typeName>;

// ***** initialization *****

export const createInstrumentGroup = (
  name: FilledString,
  instrumentIds: InstrumentId[],
): InstrumentGroup =>
  asInstrumentGroup({
    name,
    instrumentIds,
  });

// ***** assertion *****

function assertInstrumentGroup(
  v: InstrumentGroupType,
): asserts v is InstrumentGroup {
  if (v.instrumentIds.length === 0) {
    throw new TypeAssertionError(
      typeName,
      "instrumentIds should not be empty!",
    );
  }
}

const asInstrumentGroup = (v: InstrumentGroupType): InstrumentGroup => {
  assertInstrumentGroup(v);
  return v;
};
