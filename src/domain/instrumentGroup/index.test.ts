import { describe, expect, it } from "vitest";
import { createInstrumentGroup } from ".";
import { asFilledString, FilledString } from "../filledString";
import { TypeAssertionError } from "../error/appError";
import { asInstrumentId, InstrumentId } from "../instrument/instrumentId";
import { Localizable } from "../../i18n/configs";

const createTestInstrumentGroup = ({
  name = {
    en: asFilledString("xxx"),
    ja: asFilledString("あああ"),
  },
  instrumentIds = [asInstrumentId("1")],
}: {
  name?: Localizable<FilledString>;
  instrumentIds?: InstrumentId[];
} = {}) => createInstrumentGroup(name, instrumentIds);

describe(createInstrumentGroup, () => {
  it.each([{ numbers: [1] }, { numbers: [3, 128] }])(
    "midiProgramNumbersが空でない: $numbers => OK",
    ({ numbers }) => {
      // given
      const instrumentIds = numbers.map(String).map(asInstrumentId);

      // when
      const block = () => {
        createTestInstrumentGroup({ instrumentIds: instrumentIds });
      };

      // then
      expect(block).not.toThrow();
    },
  );

  it("midiProgramNumbersが空 => Error", () => {
    // given

    // when
    const block = () => {
      createTestInstrumentGroup({ instrumentIds: [] });
    };

    // then
    expect(block).toThrow(TypeAssertionError);
  });
});
