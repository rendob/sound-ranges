import * as Tone from 'tone'

const synth = new Tone.Synth().toDestination();

export function noteToPitchOctave(noteNum: number) {
    const pitchList = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const pitch = pitchList[noteNum % 12];
    const octave = Math.floor(noteNum / 12) - 1;
    return pitch + String(octave);
}

export function makeSound(noteNum: number) {
    const pitchOctave = noteToPitchOctave(noteNum);
    synth.triggerAttackRelease(pitchOctave, '4n');
}