import { unitNoteWidth } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
import { Instrument } from '../../app/data';
import { selectInstruments } from '../instruments/instrumentsSlice';
import { selectNotes } from '../keyboard/keyboardSlice';
import { noteToPitchOctave } from './sound';

interface SoundItem {
  name: string,
  pitchRange: [number, number],
  color: string,
  y: number,
}
function SoundRange(props: SoundItem) {
  const pitchOctave = props.pitchRange.map( noteNum =>
    noteToPitchOctave(noteNum)
  ).join("–");
  const x = props.pitchRange[0] * unitNoteWidth;
  const y = 100 + props.y * 40;
  const width = (props.pitchRange[1] - props.pitchRange[0] + 1) * unitNoteWidth;
  return (
    <g>
      <line
        x1={x} y1="50"
        x2={x} y2={y}
        stroke={props.color}
        strokeDasharray="4"
      />
      <line
        x1={x+width} y1="50"
        x2={x+width} y2={y}
        stroke={props.color}
        strokeDasharray="4"
      />
      <rect
        x={x} y={y}
        width={width} height="30"
        fill={props.color} fillOpacity="0.4"
        stroke={props.color} strokeOpacity="1.0"
      />
      <text
        x={x + width/2} y={y + 23}
        textAnchor="middle"
        fontSize="20"
        fill="white"
      >
        {props.name}: {pitchOctave}
      </text>
    </g>
  )
}


function isBetween(noteRange: [number, number], pitchRange: [number, number]) {
  // noteRangeがpitchRangeに含まれるか
  return (pitchRange[0] <= noteRange[0]) && (noteRange[1] <= pitchRange[1]);
}

function layoutRanges(instruments: Instrument[]) {
  const isIntersect = (a: [number, number], b:[number, number]) => ((a[0] <= b[1]) && (b[0] <= a[1]));

  const layouts: Instrument[][] = [];
  for (let i = 0; i < instruments.length; i++) {
    const instrument = instruments[i];

    for (let j = 0; j < layouts.length+1; j++) {
      if (j === layouts.length) {  // 新たな行を追加
        layouts.push([instrument]);
        break;
      }
      const someIntersect = layouts[j].some( item => isIntersect(instrument.pitchRange, item.pitchRange));
      if (!someIntersect) {  // 被ってない行があればそこに入れ込む
        layouts[j].push(instrument);
        break;
      }
    }
  }

  return layouts;
}

export function RangeCanvas() {
  const instruments = useAppSelector(selectInstruments);
  const activeNotes = useAppSelector(selectNotes);

  let activeInstruments: Instrument[];
  if (activeNotes.length === 0) {  // 空だったら全楽器表示
    activeInstruments = instruments.filter( item =>
      item.selected
    );
  } else {
    const noteRange: [number, number] = [Math.min(...activeNotes), Math.max(...activeNotes)];
    activeInstruments = instruments.filter( item =>
      item.selected && isBetween(noteRange, item.pitchRange)
    );
  }

  const alignedInstruments = layoutRanges(activeInstruments);

  const items: JSX.Element[] = [];
  for (let i = 0; i < alignedInstruments.length; i++) {
    alignedInstruments[i].forEach( item => {
      items.unshift(
        <SoundRange
          key={item.name}
          name={item.name}
          pitchRange={item.pitchRange}
          color={item.color}
          y={i}
        />
      );
    });
  }

  const width = 128 * unitNoteWidth;
  const height = window.innerHeight - 60;
  const viewBox = `0 0 ${width} ${height}`;
  return (
    <div>
      <svg width={width} height={height} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        {items}
      </svg>
    </div>
  )
}