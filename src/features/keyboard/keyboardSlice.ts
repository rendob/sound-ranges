import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface keyboardState {
  notes: number[];
}

const initialState: keyboardState = {
  notes: [],
};

export const keyboardSlice = createSlice({
  name: 'selectedNotes',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      state.notes.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter((value) => value !== action.payload);
    },
    clear: (state) => {
      state.notes = [];
    },
  },
});

export const { add, remove, clear } = keyboardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNotes = (state: RootState) => state.activeNotes.notes;

export default keyboardSlice.reducer; // counterReducerとして参照されている
