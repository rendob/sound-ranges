/** `Underscore<"xxx"> == "__xxx"` */
type Underscore<P extends string> = `__${P}`;

/** `Underscored<"xxx"> == { __xxx: "__xxx" }` */
type Underscored<T extends string> = {
  [P in T as Underscore<P>]: Underscore<P>;
};

/**
 * Branded Types
 *
 * example:
 * ```
 * type FilledString = Brand<string, "FilledString">
 * type UserId = Brand<FilledString, "UserId">
 * ```
 *
 * ref: https://zenn.dev/okunokentaro/articles/01gmpkp9gzgf47wdr7g70nmn77
 */
export type Brand<K, T extends string> = K & Underscored<T>;
