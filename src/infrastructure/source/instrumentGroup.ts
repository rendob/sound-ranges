import { asFilledString } from "../../domain/filledString";
import { asInstrumentId } from "../../domain/instrument/instrumentId";
import {
  createInstrumentGroup,
  InstrumentGroup,
} from "../../domain/instrumentGroup";
import { asInt } from "../../domain/int";
import { createArithmeticSequence } from "../../extension/arrayExt";

const create = (
  name: string,
  midiProgramNumberRange: [number, number],
): InstrumentGroup =>
  createInstrumentGroup(
    asFilledString(name),
    createArithmeticSequence(
      asInt(midiProgramNumberRange[0]),
      asInt(midiProgramNumberRange[1]),
    )
      .map(String)
      .map(asInstrumentId),
  );

export const instrumentGroups = [
  create("Piano", [1, 8]),
  create("Chromatic Percussion", [9, 16]),
  create("Organ", [17, 24]),
  create("Guitar", [25, 32]),
  create("Bass", [33, 40]),
  create("Strings", [41, 48]),
  create("Ensemble", [49, 56]),
  create("Brass", [57, 64]),
  create("Reed", [65, 72]),
  create("Pipe", [73, 80]),
  create("Synth Lead", [81, 88]),
  create("Synth Pad", [89, 96]),
  create("Synth Effects", [97, 104]),
  create("Ethnic", [105, 112]),
  create("Percussive", [113, 120]),
  create("Sound Effects", [121, 128]),
];
