import React from 'react';
import { Instruments } from './features/instruments/Instruments';
import { PianoRoll } from './features/keyboard/pianoRoll';
import './App.css';

function App() {
  return (
    <div className="App">
      <Instruments />
      <PianoRoll />
    </div>
  );
}

export default App;
