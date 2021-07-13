import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import instrumentsReducer from '../features/instruments/instrumentsSlice';
import keyboardReducer from '../features/keyboard/keyboardSlice';

export const unitNoteWidth = 12;

export const store = configureStore({
  reducer: {
    activeInstruments: instrumentsReducer,
    activeNotes: keyboardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
