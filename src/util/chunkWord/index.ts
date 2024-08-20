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
