import { create } from "zustand";
import { Brand } from "../../domain/brand";
import { InstrumentsState, initialInstrumentsState } from "./instruments/state";

type AppState = InstrumentsState;

export const useAppStore = create<AppState>(() => ({
  ...initialInstrumentsState,
}));

type ActionType = (state: AppState) => AppState;
type Action = Brand<ActionType, "Action">;

export const createAction = (action: ActionType): Action => action as Action;

export const dispatch = (update: Action) => {
  useAppStore.setState(update);
};
