import { Keyboard } from "./keyboard";
import { RangeCanvas } from "./soundRange";
import { useAppDispatch } from "../../app/hooks";
import { clear } from "./keyboardSlice";
import styles from "./pianoRoll.module.css";

export function PianoRoll() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.svgCanvas} onMouseDown={() => dispatch(clear())}>
      <Keyboard />
      <RangeCanvas />
    </div>
  );
}