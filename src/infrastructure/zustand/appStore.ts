import { create } from "zustand";
import { Brand } from "../../domain/brand";
import { InstrumentsState, initialInstrumentsState } from "./instruments/state";
import { KeyboardState, initialKeyboardState } from "./keyboard/state";
import { UiState, initialUiState } from "./uiState/state";

type AppState = InstrumentsState & KeyboardState & UiState;

export const useAppStore = create<AppState>(() => ({
  ...initialInstrumentsState,
  ...initialKeyboardState,
  ...initialUiState,
}));

type ActionType = (state: AppState) => AppState;
type Action = Brand<ActionType, "Action">;

export const createAction = (action: ActionType): Action => action as Action;

export const dispatch = (update: Action) => {
  useAppStore.setState(update);
};
