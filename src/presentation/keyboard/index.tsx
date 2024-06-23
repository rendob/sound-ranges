import { useKeyboardKeyIds } from "../../infrastructure/zustand/keyboard/selector";
import { KeyboardKeyItem } from "./keyboardKeyItem";

export const Keyboard = () => {
  const keyboardKeyIds = useKeyboardKeyIds();

  return (
    <div>
      {keyboardKeyIds.map((id) => (
        <KeyboardKeyItem key={id} id={id} />
      ))}
    </div>
  );
};
