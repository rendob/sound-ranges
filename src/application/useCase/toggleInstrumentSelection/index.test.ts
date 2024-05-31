import { assert, beforeEach, describe, expect, it } from "vitest";
import { InMemoryInstrumentRepository } from "../../../infrastructure/repository/inMemoryInstrumentRepository";
import { createToggleInstrumentSelectionUseCase } from ".";
import { getUseCaseName } from "../testUtil";
import { InstrumentRepository } from "../../../domain/interface/repository/instrumentRepository";
import { Instrument } from "../../../domain/instrument";

describe(getUseCaseName(createToggleInstrumentSelectionUseCase), () => {
  let repository: InstrumentRepository;
  let sut: ReturnType<typeof createToggleInstrumentSelectionUseCase>;
  const violinId = "Violin";
  const getViolin = (): Instrument => repository.findById(violinId);

  beforeEach(() => {
    repository = new InMemoryInstrumentRepository();
    sut = createToggleInstrumentSelectionUseCase(repository);
  });

  it("Unselected => Selected", () => {
    // given
    assert(!getViolin().isSelected, "Unselectedのはず");

    // when
    sut(violinId);

    // then
    expect(getViolin().isSelected).toBe(true);
  });

  it("Selected => Unselected", () => {
    // given
    sut(violinId);
    assert(getViolin().isSelected, "Selectedのはず");

    // when
    sut(violinId);

    // then
    expect(getViolin().isSelected).toBe(false);
  });
});
