import { createAction } from "../appStore";
import { selectShouldShowInstruments } from "./selector";

export const toggleShouldShowInstruments = () =>
  createAction((state) => {
    return {
      ...state,
      shouldShowInstruments: !selectShouldShowInstruments(state),
    };
  });

export const openSettings = () =>
  createAction((state) => ({
    ...state,
    shouldShowSettings: true,
  }));

export const closeSettings = () =>
  createAction((state) => ({
    ...state,
    shouldShowSettings: false,
  }));
