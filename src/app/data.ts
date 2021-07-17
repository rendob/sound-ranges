type InstSeed = {
  name: string;
  pitchRange: [number, number];
  color: string;
};

const items: InstSeed[] = [
  { name: 'Piano', pitchRange: [21, 108], color: 'blue' },
  { name: 'Harp', pitchRange: [23, 103], color: 'dodgerblue' },
  { name: 'Violin', pitchRange: [55, 96], color: 'palevioletred' },
  { name: 'Viola', pitchRange: [48, 84], color: 'crimson' },
  { name: 'Cello', pitchRange: [36, 72], color: 'brown' },
  { name: 'Bass', pitchRange: [28, 55], color: 'maroon' },
  { name: 'Trumpet', pitchRange: [58, 94], color: 'yellow' },
  { name: 'Horn', pitchRange: [41, 77], color: 'orange' },
  { name: 'Trombone', pitchRange: [34, 75], color: 'gold' },
  { name: 'Tuba', pitchRange: [29, 55], color: 'goldenrod' },
  { name: 'Piccolo', pitchRange: [74, 108], color: 'aquamarine' },
  { name: 'Flute', pitchRange: [60, 96], color: 'palegreen' },
  { name: 'Oboe', pitchRange: [58, 91], color: 'limegreen' },
  { name: 'Clarinet', pitchRange: [50, 91], color: 'forestgreen' },
  { name: 'Timpani', pitchRange: [36, 57], color: 'beige' },
  { name: 'Chorus', pitchRange: [48, 79], color: 'purple' },
  { name: 'Celesta', pitchRange: [60, 108], color: 'sienna' },
  { name: 'Glockenspiel', pitchRange: [72, 108], color: 'lightgray' },
  { name: 'Vibraphone', pitchRange: [53, 89], color: 'whitesmoke' },
  { name: 'Marimba', pitchRange: [48, 84], color: 'darkred' },
  { name: 'Organ', pitchRange: [36, 96], color: 'chocolate' },
  { name: 'Accordion', pitchRange: [53, 89], color: 'red' },
  { name: 'Harmonica', pitchRange: [60, 84], color: 'wheat' },
  { name: 'Guitar', pitchRange: [40, 84], color: 'darkorange' },
  { name: 'Bass Guitar', pitchRange: [28, 55], color: 'gray' },
];

export type Instrument = {
  name: string;
  pitchRange: [number, number]; // min - max
  selected: boolean;
  color: string;
};

export const instrumentList: Instrument[] = items.map((item) => ({
  ...item,
  selected: true,
}));
