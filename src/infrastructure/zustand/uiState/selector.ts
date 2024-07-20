import { useAppStore } from "../appStore";
import { UiState } from "./state";

export const selectShouldShowInstruments = (state: UiState): boolean =>
  state.shouldShowInstruments;

export const selectShouldShowSettings = (state: UiState): boolean =>
  state.shouldShowSettings;

// ***** selector hooks *****

export const useShouldShowInstruments = () =>
  useAppStore(selectShouldShowInstruments);

export const useShouldShowSettings = () =>
  useAppStore(selectShouldShowSettings);
