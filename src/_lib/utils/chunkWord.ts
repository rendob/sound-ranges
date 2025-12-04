/**
 * `word`を`separators`に含まれる文字の直後で分割
 *
 * @param word 単語
 * @param separators 分割する文字
 * @returns 分割された単語のリスト
 */
export const chunkWord = (word: string, separators: string[]): string[] => {
  const chunks: string[] = [];
  let chunk = "";
  for (const s of word) {
    chunk += s;
    if (separators.includes(s)) {
      chunks.push(chunk);
      chunk = "";
    }
  }
  chunks.push(chunk);

  return chunks;
};

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

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
      const separators = [" ", "・"];

      // when
      const result = chunkWord(word, separators);

      // then
      expect(result).toStrictEqual(expected);
    });
  });
}
