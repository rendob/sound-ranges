export interface ValueObject<T> {
  isEqual(other: T): boolean;
}
