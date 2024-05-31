import { Instrument } from "../../instrument";
import { InstrumentCategory } from "../../instrument/instrumentCategory";

export interface InstrumentRepository {
  getAll(): Instrument[];
  findById(id: string): Instrument;
  findByCategory(category: InstrumentCategory): Instrument[];
  save(instrument: Instrument): void;
}
