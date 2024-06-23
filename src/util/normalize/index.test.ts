import { assert, describe, expect, it } from "vitest";
import { normalize, updateItem, updateItems } from ".";
import { asFilledString } from "../../domain/filledString";

const list = [
  { id: asFilledString("aa"), lib: "redux" },
  { id: asFilledString("ab"), lib: "recoil" },
  { id: asFilledString("ac"), lib: "zustand" },
  { id: asFilledString("ad"), lib: "jotai" },
];

describe(normalize, () => {
  it("Success Case", () => {
    // given

    // when
    const result = normalize(list);

    // then
    const expected = {
      allIds: ["aa", "ab", "ac", "ad"],
      byId: {
        aa: list[0],
        ab: list[1],
        ac: list[2],
        ad: list[3],
      },
    };
    expect(result).toStrictEqual(expected);
  });
});

describe(updateItem, () => {
  it("Success Case", () => {
    // given
    const items = normalize(list);
    assert(items.byId[asFilledString("ab")].lib === "recoil");

    // when
    const result = updateItem(items, asFilledString("ab"), (item) => ({
      ...item,
      lib: "valtio",
    }));

    // then
    const expected = {
      allIds: ["aa", "ab", "ac", "ad"],
      byId: {
        aa: list[0],
        ab: { ...list[1], lib: "valtio" },
        ac: list[2],
        ad: list[3],
      },
    };
    expect(result).toStrictEqual(expected);
  });
});

describe(updateItems, () => {
  it("Success Case", () => {
    // given
    const items = normalize(list);
    assert(items.byId[asFilledString("ab")].lib === "recoil");
    assert(items.byId[asFilledString("ac")].lib === "zustand");

    // when
    const result = updateItems(
      items,
      [asFilledString("ab"), asFilledString("ac")],
      (item) => ({
        ...item,
        lib: item.lib + "!",
      }),
    );

    // then
    const expected = {
      allIds: ["aa", "ab", "ac", "ad"],
      byId: {
        aa: list[0],
        ab: { ...list[1], lib: "recoil!" },
        ac: { ...list[2], lib: "zustand!" },
        ad: list[3],
      },
    };
    expect(result).toStrictEqual(expected);
  });
});
