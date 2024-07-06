import { createAction } from "../appStore";
import { selectShouldShowInstruments } from "./selector";

export const toggleShouldShowInstruments = () =>
  createAction((state) => {
    return {
      ...state,
      shouldShowInstruments: !selectShouldShowInstruments(state),
    };
  });
