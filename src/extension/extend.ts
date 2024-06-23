/** ref: https://qiita.com/crispy/items/a425b37534feaebbbbe4 */
export function extend(
  base: { prototype: unknown },
  extension: { [key: string]: (...args: never[]) => unknown },
) {
  Object.getOwnPropertyNames(extension).forEach((propertyName) => {
    Object.defineProperty(base.prototype, propertyName, {
      value: extension[propertyName],
    });
  });
}
