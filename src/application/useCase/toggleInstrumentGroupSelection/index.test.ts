import { assert, beforeEach, describe, expect, it } from "vitest";
import { InMemoryInstrumentRepository } from "../../../infrastructure/repository/inMemoryInstrumentRepository";
import { createToggleInstrumentGroupSelectionUseCase } from ".";
import {
  SelectionStatus,
  getInstrumentGroup,
} from "../../../domain/instrumentService";
import { InstrumentCategory } from "../../../domain/instrument/instrumentCategory";
import { createToggleInstrumentSelectionUseCase } from "../toggleInstrumentSelection";
import { getUseCaseName } from "../testUtil";
import { InstrumentRepository } from "../../../domain/interface/repository/instrumentRepository";

describe(getUseCaseName(createToggleInstrumentGroupSelectionUseCase), () => {
  let repository: InstrumentRepository;
  let sut: ReturnType<typeof createToggleInstrumentGroupSelectionUseCase>;
  const getStringsGroup = () =>
    getInstrumentGroup(repository.getAll(), InstrumentCategory.STRINGS);

  beforeEach(() => {
    repository = new InMemoryInstrumentRepository();
    sut = createToggleInstrumentGroupSelectionUseCase(repository);
  });

  it("Unselected => Selected", () => {
    // given
    assert(
      getStringsGroup().selectionStatus === SelectionStatus.UNSELECTED,
      "Unselectedのはず",
    );

    // when
    sut(InstrumentCategory.STRINGS);

    // then
    expect(getStringsGroup().selectionStatus).toBe(SelectionStatus.SELECTED);
  });

  it("Mixed => Selected", () => {
    // given
    createToggleInstrumentSelectionUseCase(repository)("Violin");
    assert(
      getStringsGroup().selectionStatus === SelectionStatus.MIXED,
      "Mixedのはず",
    );

    // when
    sut(InstrumentCategory.STRINGS);

    // then
    expect(getStringsGroup().selectionStatus).toBe(SelectionStatus.SELECTED);
  });

  it("Selected => UnSelected", () => {
    // given
    sut(InstrumentCategory.STRINGS);
    assert(
      getStringsGroup().selectionStatus === SelectionStatus.SELECTED,
      "Selectedのはず",
    );

    // when
    sut(InstrumentCategory.STRINGS);

    // then
    expect(getStringsGroup().selectionStatus).toBe(SelectionStatus.UNSELECTED);
  });
});
