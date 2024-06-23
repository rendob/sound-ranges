import { assert, describe, expect, it } from "vitest";
import { KeyboardKey, createKeyboardKey, isBlackKey, setIsSelected } from ".";
import { asNoteNumber, assertNoteNumber } from "../noteNumber";

const createTestKeyboardKey = (noteNumber: number = 0): KeyboardKey =>
  createKeyboardKey(asNoteNumber(noteNumber));

describe(createKeyboardKey, () => {
  it.each([{ noteNumber: 0 }, { noteNumber: 67 }, { noteNumber: 127 }])(
    "引数が有効なnoteNumber: $noteNumber => OK",
    ({ noteNumber }) => {
      // given
      assertNoteNumber(noteNumber);

      // when
      const block = () => {
        createKeyboardKey(noteNumber);
      };

      // then
      expect(block).not.toThrow();
    },
  );
});

describe("initialization", () => {
  it("初期化時は非選択状態", () => {
    // given

    // when
    const sut = createTestKeyboardKey();

    // then
    expect(sut.isSelected).toBe(false);
  });
});

describe(isBlackKey, () => {
  it.each([
    { noteNumber: 1, pitchName: "C♯/D♭" },
    { noteNumber: 15, pitchName: "D♯/E♭" },
    { noteNumber: 30, pitchName: "E♯/F♭" },
    { noteNumber: 44, pitchName: "G♯/A♭" },
    { noteNumber: 58, pitchName: "A♯/B♭" },
  ])("黒鍵: $pitchName => true", ({ noteNumber }) => {
    // given
    const sut = createTestKeyboardKey(noteNumber);

    // when
    const result = isBlackKey(sut);

    // then
    expect(result).toBe(true);
  });

  it.each([
    { noteNumber: 0, pitchName: "C" },
    { noteNumber: 14, pitchName: "D" },
    { noteNumber: 28, pitchName: "E" },
    { noteNumber: 41, pitchName: "F" },
    { noteNumber: 55, pitchName: "G" },
    { noteNumber: 69, pitchName: "A" },
    { noteNumber: 83, pitchName: "B" },
  ])("白鍵: $pitchName => false", ({ noteNumber }) => {
    // given
    const sut = createTestKeyboardKey(noteNumber);

    // when
    const result = isBlackKey(sut);

    // then
    expect(result).toBe(false);
  });
});

describe(setIsSelected, () => {
  it.each([
    { isSelected: false, expected: false },
    { isSelected: true, expected: true },
  ])(
    "非選択状態で実行: set $isSelected => $expected",
    ({ isSelected, expected }) => {
      // given
      const sut = createTestKeyboardKey();
      assert(!sut.isSelected, "非選択状態のはず");

      // when
      const result = setIsSelected(sut, isSelected);

      // then
      expect(result.isSelected).toBe(expected);
    },
  );

  it.each([
    { isSelected: false, expected: false },
    { isSelected: true, expected: true },
  ])(
    "選択状態で実行: set $isSelected => $expected",
    ({ isSelected, expected }) => {
      // given
      const sut = setIsSelected(createTestKeyboardKey(), true);
      assert(sut.isSelected, "選択状態のはず");

      // when
      const result = setIsSelected(sut, isSelected);

      // then
      expect(result.isSelected).toBe(expected);
    },
  );
});
