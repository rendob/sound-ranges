import { asFilledString } from "../../domain/filledString";
import { asInstrumentId } from "../../domain/instrument/instrumentId";
import {
  createInstrumentGroup,
  InstrumentGroup,
} from "../../domain/instrumentGroup";
import { asInt } from "../../domain/int";
import { createArithmeticSequence } from "../../extension/arrayExt";

const create = (
  nameEn: string,
  nameJa: string,
  midiProgramNumberRange: [number, number],
): InstrumentGroup =>
  createInstrumentGroup(
    {
      en: asFilledString(nameEn),
      ja: asFilledString(nameJa),
    },
    createArithmeticSequence(
      asInt(midiProgramNumberRange[0]),
      asInt(midiProgramNumberRange[1]),
    )
      .map(String)
      .map(asInstrumentId),
  );

export const instrumentGroups = [
  create("Piano", "ピアノ", [1, 8]),
  create("Chromatic Percussion", "クロマチック・パーカッション", [9, 16]),
  create("Organ", "オルガン", [17, 24]),
  create("Guitar", "ギター", [25, 32]),
  create("Bass", "ベース", [33, 40]),
  create("Strings", "ストリングス", [41, 48]),
  create("Ensemble", "アンサンブル", [49, 56]),
  create("Brass", "ブラス", [57, 64]),
  create("Reed", "リード", [65, 72]),
  create("Pipe", "パイプ", [73, 80]),
  create("Synth Lead", "シンセ・リード", [81, 88]),
  create("Synth Pad", "シンセ・パッド", [89, 96]),
  create("Synth Effects", "シンセ・エフェクト", [97, 104]),
  create("Ethnic", "エスニック", [105, 112]),
  create("Percussive", "パーカッシブ", [113, 120]),
  create("Sound Effects", "サウンド・エフェクト", [121, 128]),
];
