import { ValidationError } from "../error/appError";
import { ValueObject } from "../valueObject";
import { PitchType } from "./pitchType";

export class Note implements ValueObject<Note> {
  private static readonly MIN_NOTE_NUMBER = 0;
  private static readonly MAX_NOTE_NUMBER = 127;
  private static readonly ACCIDENTAL_PITCH_NUMBERS = [1, 3, 6, 8, 10];
  private static readonly PITCH_NAMES = [
    ["C"],
    ["C♯", "D♭"],
    ["D"],
    ["D♯", "E♭"],
    ["E"],
    ["F"],
    ["F♯", "G♭"],
    ["G"],
    ["G♯", "A♭"],
    ["A"],
    ["A♯", "B♭"],
    ["B"],
  ];

  constructor(public readonly noteNumber: number) {
    this.validate();
  }

  // ***** getter *****

  public get isAccidental() {
    return Note.ACCIDENTAL_PITCH_NUMBERS.includes(this.pitchNumber);
  }

  private get pitchNumber() {
    return this.noteNumber % 12;
  }

  private get isInteger() {
    return Number.isInteger(this.noteNumber);
  }

  private get isInValidRange() {
    return (
      this.noteNumber >= Note.MIN_NOTE_NUMBER &&
      this.noteNumber <= Note.MAX_NOTE_NUMBER
    );
  }

  // ***** method *****

  public isEqual(other: Note) {
    return this.noteNumber === other.noteNumber;
  }

  public getNoteNames(pitchType: PitchType) {
    const pitchNames = Note.PITCH_NAMES[this.pitchNumber];
    const octave = pitchType.minOctave + Math.floor(this.noteNumber / 12);
    return pitchNames.map((pitchName) => `${pitchName}${octave}`);
  }

  private validate() {
    if (!this.isInteger) {
      throw new ValidationError(`${this.noteNumber} is not integer!`);
    }
    if (!this.isInValidRange) {
      throw new ValidationError(
        `${this.noteNumber} is not in the valid range (${Note.MIN_NOTE_NUMBER} - ${Note.MAX_NOTE_NUMBER})!`,
      );
    }
  }
}
