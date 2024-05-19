import { ValidationError } from "../error/appError";
import { InstrumentCategory } from "./instrumentCategory";
import { Note } from "../note";
import { NoteRange } from "../noteRange";
import { RgbColor } from "../rgbColor";

export class Instrument {
  private constructor(
    public readonly name: string,
    public readonly category: InstrumentCategory,
    public readonly range: NoteRange,
    public readonly color: RgbColor,
    public readonly isSelected: boolean,
  ) {
    this.validate();
  }

  // ***** factory *****

  public static new(
    name: string,
    category: InstrumentCategory,
    range: NoteRange,
    color: RgbColor,
  ): Instrument {
    return new Instrument(name, category, range, color, false);
  }

  // ***** getter *****

  public get id() {
    return this.name;
  }

  // ***** method *****

  public canPlay(note: Note) {
    return this.range.contains(note);
  }

  public canPlayAll(noteRange: NoteRange) {
    return this.canPlay(noteRange.min) && this.canPlay(noteRange.max);
  }

  public selectionUpdated(isSelected: boolean): Instrument {
    return new Instrument(
      this.name,
      this.category,
      this.range,
      this.color,
      isSelected,
    );
  }

  private validate() {
    if (this.name.length === 0) {
      throw new ValidationError("name should not be empty!");
    }
  }
}
