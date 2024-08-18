import { assert, describe, expect, it } from "vitest";
import {
  canPlay,
  canPlayAll,
  createInstrument,
  getDisplayName,
  setSelectionStatus,
} from ".";
import { asNoteNumber, assertNoteNumber } from "../noteNumber";
import { createNoteRange } from "../noteRange";
import { asFilledString, FilledString } from "../filledString";
import { SelectionStatus } from "./selectionStatus";
import { asMidiProgramNumber } from "../midiProgramNumber";
import { LangCode, Localizable } from "../../i18n/configs";

const createTestInstrument = ({
  midiProgramNumber = 1,
  name = {
    en: asFilledString("xxx"),
    ja: asFilledString("あああ"),
  },
  min = 0,
  max = 127,
}: {
  midiProgramNumber?: number;
  name?: Localizable<FilledString>;
  min?: number | null;
  max?: number | null;
} = {}) =>
  createInstrument(
    asMidiProgramNumber(midiProgramNumber),
    name,
    min !== null && max !== null
      ? createNoteRange(asNoteNumber(min), asNoteNumber(max))
      : null,
  );

describe("initialization", () => {
  it("初期化時は選択状態", () => {
    // given

    // when
    const sut = createTestInstrument();

    // then
    expect(sut.selectionStatus).toBe(SelectionStatus.SELECTED);
  });
});

describe(getDisplayName, () => {
  it.each([
    {
      midiProgramNumber: 1,
      name: { en: "Piano", ja: "ピアノ" },
      langCode: "en",
      expected: "1. Piano",
    },
    {
      midiProgramNumber: 1,
      name: { en: "Piano", ja: "ピアノ" },
      langCode: "ja",
      expected: "1. ピアノ",
    },
    {
      midiProgramNumber: 106,
      name: { en: "Tuba", ja: "チューバ" },
      langCode: "en",
      expected: "106. Tuba",
    },
    {
      midiProgramNumber: 106,
      name: { en: "Tuba", ja: "チューバ" },
      langCode: "ja",
      expected: "106. チューバ",
    },
  ])(
    "midiProgramNumber: $midiProgramNumber, name: $name, langCode: $langCode => $expected",
    ({ midiProgramNumber, name, langCode, expected }) => {
      // given
      const sut = createTestInstrument({
        midiProgramNumber,
        name: name as Localizable<FilledString>,
      });

      // when
      const result = getDisplayName(sut, langCode as LangCode);

      // then
      expect(result).toBe(expected);
    },
  );
});

describe(canPlay, () => {
  it.each([
    { min: 40, max: 99, noteNumber: 10, expected: false },
    { min: 40, max: 99, noteNumber: 39, expected: false },
    { min: 40, max: 99, noteNumber: 40, expected: true },
    { min: 40, max: 99, noteNumber: 68, expected: true },
    { min: 40, max: 99, noteNumber: 99, expected: true },
    { min: 40, max: 99, noteNumber: 100, expected: false },
    { min: 40, max: 99, noteNumber: 127, expected: false },
  ])(
    "[$min, $max] can play $noteNumber => $expected",
    ({ min, max, noteNumber, expected }) => {
      // given
      const sut = createTestInstrument({ min, max });
      assertNoteNumber(noteNumber);

      // when
      const result = canPlay(sut, noteNumber);

      // then
      expect(result).toBe(expected);
    },
  );
});

describe(canPlayAll, () => {
  it.each([
    { min: 40, max: 99, range: [0, 20], expected: false },
    { min: 40, max: 99, range: [30, 60], expected: false },
    { min: 40, max: 99, range: [40, 52], expected: true },
    { min: 40, max: 99, range: [52, 74], expected: true },
    { min: 40, max: 99, range: [74, 99], expected: true },
    { min: 40, max: 99, range: [80, 100], expected: false },
    { min: 40, max: 99, range: [108, 111], expected: false },
    { min: 40, max: 99, range: [0, 111], expected: false },
  ])(
    "[$min, $max] can play $range => $expected",
    ({ min, max, range, expected }) => {
      // given
      const sut = createTestInstrument({ min, max });
      const noteRange = createNoteRange(
        asNoteNumber(range[0]),
        asNoteNumber(range[1]),
      );

      // when
      const result = canPlayAll(sut, noteRange);

      // then
      expect(result).toBe(expected);
    },
  );
});

describe(setSelectionStatus, () => {
  it.each([
    { selectionStatus: SelectionStatus.UNSELECTED },
    { selectionStatus: SelectionStatus.SELECTED },
  ])(
    "選択状態で実行: set $selectionStatus => $selectionStatus",
    ({ selectionStatus }) => {
      // given
      const sut = createTestInstrument();
      assert(
        sut.selectionStatus === SelectionStatus.SELECTED,
        "選択状態のはず",
      );

      // when
      const result = setSelectionStatus(sut, selectionStatus);

      // then
      expect(result.selectionStatus).toBe(selectionStatus);
    },
  );

  it.each([
    { selectionStatus: SelectionStatus.UNSELECTED },
    { selectionStatus: SelectionStatus.SELECTED },
  ])(
    "非選択状態で実行: set $selectionStatus => $selectionStatus",
    ({ selectionStatus }) => {
      // given
      const sut = setSelectionStatus(
        createTestInstrument(),
        SelectionStatus.UNSELECTED,
      );
      assert(
        sut.selectionStatus === SelectionStatus.UNSELECTED,
        "非選択状態のはず",
      );

      // when
      const result = setSelectionStatus(sut, selectionStatus);

      // then
      expect(result.selectionStatus).toBe(selectionStatus);
    },
  );
});
