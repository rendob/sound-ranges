import { ValidationError } from "../error/appError";
import { ValueObject } from "../valueObject";
import { Note } from "../note";

export class NoteRange implements ValueObject<NoteRange> {
  constructor(
    public readonly min: Note,
    public readonly max: Note,
  ) {
    this.validate();
  }

  // ***** method *****

  public isEqual(other: NoteRange) {
    return this.min.isEqual(other.min) && this.max.isEqual(other.max);
  }

  public contains(noteNumber: Note) {
    return (
      this.min.noteNumber <= noteNumber.noteNumber &&
      noteNumber.noteNumber <= this.max.noteNumber
    );
  }

  private validate() {
    if (this.min.noteNumber > this.max.noteNumber) {
      throw new ValidationError(
        `min value (${this.min.noteNumber}) should be less than or equal to max value (${this.max.noteNumber})`,
      );
    }
  }
}
