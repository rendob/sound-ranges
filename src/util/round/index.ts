/**
 * 指定された桁数で四捨五入
 *
 * @param value 四捨五入したい値
 * @param place 何の位で四捨五入するか (100, 10, 1, 0.1, ...)
 * @returns 四捨五入された値
 */
export const round = (value: number, place: number): number =>
  Math.round(value / place) * place;
