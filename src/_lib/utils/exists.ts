export const exists = <T>(v: T): v is NonNullable<T> =>
  typeof v !== "undefined" && v !== null;

export function assertExists<T>(v: T): asserts v is NonNullable<T> {
  if (!exists(v)) {
    throw new Error("Unexpected Nullable!");
  }
}

export const asExists = <T>(v: T): NonNullable<T> => {
  assertExists(v);
  return v;
};
