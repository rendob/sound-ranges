import { Nullable } from "vitest";

const exists = <T>(v: Nullable<T>): v is NonNullable<T> =>
  typeof v !== "undefined" && v !== null;

// 型推論の都合上functionで定義する必要がある
export function assertExists<T>(v: Nullable<T>): asserts v is NonNullable<T> {
  if (!exists(v)) {
    throw new Error(`Unexpected Nullable!`);
  }
}
