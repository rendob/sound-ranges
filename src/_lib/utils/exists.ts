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

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe(exists, () => {
    it.each([
      { value: 0, expected: true },
      { value: 1, expected: true },
      { value: "", expected: true },
      { value: "abc", expected: true },
      { value: undefined, expected: false },
      { value: null, expected: false },
    ])("$value => $expected", ({ value, expected }) => {
      const result = exists(value);

      expect(result).toBe(expected);
    });
  });

  describe(assertExists, () => {
    it.each([
      { value: 0 },
      { value: 1 },
      { value: "" },
      { value: "abc" },
    ])("$value => OK", (value) => {
      const block = (): void => {
        assertExists(value);
      };

      expect(block).not.toThrow();
    });

    it.each([{ value: undefined }, { value: null }])("$value => Error", ({
      value,
    }) => {
      const block = (): void => {
        assertExists(value);
      };

      expect(block).toThrow();
    });
  });
}
