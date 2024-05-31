import { Instrument } from "../../domain/instrument";
import { InstrumentCategory } from "../../domain/instrument/instrumentCategory";
import { InstrumentRepository } from "../../domain/interface/repository/instrumentRepository";
import { assertExists } from "../../util/exists";
import { createInstruments } from "../source/instrumentData";

export class InMemoryInstrumentRepository implements InstrumentRepository {
  private instruments = createInstruments();

  getAll(): Instrument[] {
    return this.instruments;
  }

  findById(id: string): Instrument {
    const instrument = this.instruments.find(
      (instrument) => instrument.id === id,
    );
    assertExists(instrument);
    return instrument;
  }

  findByCategory(category: InstrumentCategory): Instrument[] {
    return this.instruments.filter(
      (instrument) => instrument.category === category,
    );
  }

  save(instrument: Instrument): void {
    const index = this.instruments.findIndex(
      (item) => item.id === instrument.id,
    );
    if (index === -1) return;

    this.instruments[index] = instrument;
  }
}
