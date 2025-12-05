export type WithKey<T extends Record<string, unknown>, Value = unknown> = {
  [K in keyof T]: Value;
};

if (import.meta.vitest) {
  const { it, expectTypeOf } = import.meta.vitest;

  it("WithKey type test", () => {
    expectTypeOf<WithKey<{ a: string }>>().toEqualTypeOf<{ a: unknown }>();

    expectTypeOf<WithKey<{ x: number; y: Date }, string>>().toEqualTypeOf<{
      x: string;
      y: string;
    }>();
  });
}
