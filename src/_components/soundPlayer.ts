import { getFrequency, type NoteNumber } from "@/_features/noteNumber/model";

const DEFAULT_VOLUME = 0.3;

const audioContext = new AudioContext();
let oscillator: OscillatorNode | null = null;

const playNote = async (noteNumber: NoteNumber) => {
  await audioContext.resume();
  stopPlaying();
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = getFrequency(noteNumber);

  const gain = audioContext.createGain();
  gain.gain.value = DEFAULT_VOLUME;

  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
};

const stopPlaying = () => {
  oscillator?.stop();
  oscillator = null;
};

export const soundPlayer = { playNote, stopPlaying };
