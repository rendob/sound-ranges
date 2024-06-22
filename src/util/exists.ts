import { Nullable } from "vitest";

const exists = <T>(value: Nullable<T>): value is NonNullable<T> =>
  typeof value !== "undefined" && value !== null;

// 型推論の都合上functionで定義する必要がある
export function assertExists<T>(
  value: Nullable<T>,
): asserts value is NonNullable<T> {
  if (!exists(value)) {
    throw new Error(`Unexpected Nullable!`);
  }
}
