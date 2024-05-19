import { ValidationError } from "../error/appError";
import { ValueObject } from "../valueObject";

export class RgbColor implements ValueObject<RgbColor> {
  private static readonly MIN_COLOR_VALUE = 0;
  private static readonly MAX_COLOR_VALUE = 255;
  constructor(
    public readonly red: number,
    public readonly green: number,
    public readonly blue: number,
  ) {
    this.validate();
  }

  // ***** getter *****

  public get colorCode() {
    return (
      "#" +
      [this.red, this.green, this.blue]
        .map((colorValue) => colorValue.toString(16).padStart(2, "0"))
        .join("")
    );
  }

  // ***** method *****

  public isEqual(other: RgbColor): boolean {
    return (
      this.red === other.red &&
      this.green === other.green &&
      this.blue === other.blue
    );
  }

  private validate() {
    [this.red, this.green, this.blue].forEach(this.validateColorValue);
  }

  private validateColorValue(colorValue: number) {
    if (!Number.isInteger(colorValue)) {
      throw new ValidationError("color value should be integer!");
    }

    if (
      colorValue < RgbColor.MIN_COLOR_VALUE ||
      colorValue > RgbColor.MAX_COLOR_VALUE
    ) {
      throw new ValidationError(
        `color value should be in ${RgbColor.MIN_COLOR_VALUE} ~ ${RgbColor.MAX_COLOR_VALUE}!`,
      );
    }
  }
}
