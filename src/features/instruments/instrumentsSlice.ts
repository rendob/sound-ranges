import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { instrumentList, Instrument } from '../../app/data';

export interface InstrumentsState {
  instruments: Instrument[];
}

const initialState: InstrumentsState = {
  instruments: instrumentList,
};

export const instrumentsSlice = createSlice({
  name: 'selectedInstruments',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      for (let i = 0; i < state.instruments.length; i++) {
        const instrument: Instrument = state.instruments[i];
        if (instrument.name === action.payload) {
          state.instruments[i].selected = !instrument.selected;
          break;
        }
      }
    },
  },
});

export const { toggle } = instrumentsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectInstruments = (state: RootState) =>
  state.activeInstruments.instruments;

export default instrumentsSlice.reducer; // counterReducerとして参照されている
