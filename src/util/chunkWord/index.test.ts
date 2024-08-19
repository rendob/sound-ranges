import { describe, expect, it } from "vitest";
import { chunkWord } from ".";

describe(chunkWord, () => {
  it.each([
    {
      word: "1. アコースティック・グランド・ピアノ",
      expected: ["1. ", "アコースティック・", "グランド・", "ピアノ"],
    },
    {
      word: "25. アコースティック・ギター (ナイロン)",
      expected: ["25. ", "アコースティック・", "ギター ", "(ナイロン)"],
    },
  ])("$word => $expected", ({ word, expected }) => {
    // given
    const separators = [" ", "・"];

    // when
    const result = chunkWord(word, separators);

    // then
    expect(result).toStrictEqual(expected);
  });
});
