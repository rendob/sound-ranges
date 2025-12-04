import {
  asNoteNumber,
  isAccidental,
  type NoteNumber,
} from "@/_features/noteNumber/model";

const OCTAVE_LENGTH = 12;
const BORDER_WIDTH = 1;

export const createTableBackground = () => {
  const halfBorderWidthPx = `${BORDER_WIDTH / 2}px`;

  const createBorderBackground = (noteNumber: NoteNumber): string[] => {
    const borderColor = fade("--color-piano-border");
    const centerX = `var(--piano-key-width) * ${noteNumber}`;
    return [
      `${borderColor} calc(${centerX} - ${halfBorderWidthPx})`,
      `${borderColor} calc(${centerX} + ${halfBorderWidthPx})`,
    ];
  };

  const createKeyBackground = (noteNumber: NoteNumber): string[] => {
    const color = fade(
      isAccidental(noteNumber) ? "--color-piano-black" : "--color-piano-white",
    );
    const startX = `calc(var(--piano-key-width) * ${noteNumber} + ${halfBorderWidthPx})`;
    const endX = `calc(var(--piano-key-width) * ${noteNumber + 1} - ${halfBorderWidthPx})`;
    return [`${color} ${startX}`, `${color} ${endX}`];
  };

  const octaveBackground = Array.from({ length: OCTAVE_LENGTH }, (_, index) =>
    asNoteNumber(index),
  )
    .flatMap((noteNumber) => [
      ...createBorderBackground(noteNumber),
      ...createKeyBackground(noteNumber),
    ])
    .join(",");

  return `repeating-linear-gradient(to right, ${octaveBackground})`;
};

const fade = (colorVariable: string): string =>
  `color-mix(in srgb, var(${colorVariable}) 10%, transparent)`;
