import { describe, expect, it } from "vitest";
import { InMemoryInstrumentRepository } from "../../../infrastructure/repository/inMemoryInstrumentRepository";
import { createGetInstrumentsUseCase } from ".";
import { getUseCaseName } from "../testUtil";

describe(getUseCaseName(createGetInstrumentsUseCase), () => {
  it("Success Case", () => {
    // given
    const repository = new InMemoryInstrumentRepository();
    const sut = createGetInstrumentsUseCase(repository);

    // when
    const instruments = sut();

    // then
    expect(instruments).toStrictEqual(repository.getAll());
  });
});
