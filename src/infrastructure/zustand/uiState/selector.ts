import { useAppStore } from "../appStore";
import { UiState } from "./state";

export const selectShouldShowInstruments = (state: UiState): boolean =>
  state.shouldShowInstruments;

// ***** selector hooks *****

export const useShouldShowInstruments = () =>
  useAppStore(selectShouldShowInstruments);
