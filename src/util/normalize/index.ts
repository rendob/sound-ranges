import { TypeAssertionError } from "../../domain/error/appError";
import { FilledString } from "../../domain/filledString";

export type Normalized<ID extends FilledString, T extends { id: ID }> = {
  allIds: ID[];
  byId: { [key in ID]: T };
};

export const normalize = <ID extends FilledString, T extends { id: ID }>(
  list: T[],
): Normalized<ID, T> => {
  const allIds = list.map((item) => item.id);

  const entries: [ID, T][] = list.map((item) => [item.id, item]);
  const byId = Object.fromEntries(entries);
  assertById(byId, allIds);

  return {
    allIds,
    byId,
  };
};

/**
 * `items[id]`を`update`で更新 (non-destructive)
 */
export const updateItem = <ID extends FilledString, T extends { id: ID }>(
  items: Normalized<ID, T>,
  id: ID,
  update: (oldItem: T) => T,
): Normalized<ID, T> => {
  const newById = { ...items.byId };
  newById[id] = update(newById[id]);
  return {
    allIds: items.allIds,
    byId: newById,
  };
};

/**
 * `ids`に含まれる`id`の`items`要素を`update`で更新 (non-destructive)
 */
export const updateItems = <ID extends FilledString, T extends { id: ID }>(
  items: Normalized<ID, T>,
  ids: ID[],
  update: (oldItem: T) => T,
): Normalized<ID, T> => {
  const newById = { ...items.byId };
  ids.forEach((id) => {
    newById[id] = update(newById[id]);
  });
  return {
    allIds: items.allIds,
    byId: newById,
  };
};

function assertById<ID extends FilledString, T extends { id: ID }>(
  v: {
    [key: string]: T;
  },
  allIds: ID[],
): asserts v is Normalized<ID, T>["byId"] {
  const keys = Object.keys(v);
  if (keys.some((key) => !(allIds as string[]).includes(key))) {
    throw new TypeAssertionError(
      "Normalized[byId]",
      `each byId's key (${keys}) should be in allIds (${allIds})!`,
    );
  }
}
