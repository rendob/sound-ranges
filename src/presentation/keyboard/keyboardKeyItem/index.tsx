import { KeyboardKeyId } from "../../../domain/keyboardKey/keyboardKeyId";
import { dispatch } from "../../../infrastructure/zustand/appStore";
import { setKeyboardSelection } from "../../../infrastructure/zustand/keyboard/action";
import { useKeyboardKey } from "../../../infrastructure/zustand/keyboard/selector";

type Props = { id: KeyboardKeyId };

export const KeyboardKeyItem = ({ id }: Props) => {
  const keyboardKey = useKeyboardKey(id);

  const handleClick = () =>
    dispatch(setKeyboardSelection(id, !keyboardKey.isSelected));

  return (
    <p onClick={handleClick}>
      {keyboardKey.noteNumber} {String(keyboardKey.isSelected)}
    </p>
  );
};
