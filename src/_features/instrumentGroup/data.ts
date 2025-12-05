import type { Localizable } from "@/_lib/i18n/i18n";
import type { WithKey } from "@/_lib/utils/withKey";
import { type InstrumentGroup, instrumentGroupSchema } from "./model";

export const instrumentGroups: InstrumentGroup[] = [
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

// アロー関数だと上に定義しないといけないので function で書く
function create(
  nameEn: string,
  nameJa: string,
  midiProgramNumberRange: [number, number],
): InstrumentGroup {
  return instrumentGroupSchema.parse({
    name: {
      en: nameEn,
      ja: nameJa,
    } satisfies Localizable<string>,
    midiProgramNumbers: Array.from(
      { length: midiProgramNumberRange[1] - midiProgramNumberRange[0] + 1 },
      (_, index) => midiProgramNumberRange[0] + index,
    ),
  } satisfies WithKey<InstrumentGroup>);
}
