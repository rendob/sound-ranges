import React from 'react';
import { unitNoteWidth } from '../../app/store';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { add, clear, selectNotes } from './keyboardSlice';
import { makeSound, noteToPitchOctave } from './sound';
import styles from './pianoRoll.module.css';

interface DisplayKey {
  noteNum: number;
  selected: boolean;
}

function SingleKey(props: DisplayKey) {
  const dispatch = useAppDispatch();
  const x = props.noteNum * unitNoteWidth;
  const blackNums = [1, 3, 6, 8, 10]; // 黒鍵を12で割った余り
  let color: string;
  let textColor: string;
  if (blackNums.includes(props.noteNum % 12)) {
    // 黒鍵
    color = props.selected ? '#37557c' : '#232323';
    textColor = 'white';
  } else {
    color = props.selected ? '#7097ca' : '#d9d9da';
    textColor = 'black';
  }

  function handleMouseDown(e: React.MouseEvent<SVGGElement, MouseEvent>) {
    if (!e.shiftKey) {
      dispatch(clear());
    }
    dispatch(add(props.noteNum));
    makeSound(props.noteNum);
    e.stopPropagation();
  }

  function handleMouseEnter(e: React.MouseEvent<SVGGElement, MouseEvent>) {
    if (e.buttons === 1) {
      // left click
      dispatch(add(props.noteNum));
      makeSound(props.noteNum);
    }
  }

  return (
    <g
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseEnter={(e) => handleMouseEnter(e)}
    >
      <rect
        x={x}
        y="0"
        width={unitNoteWidth}
        height="50"
        fill={color}
        stroke="black"
      />
      {props.noteNum % 12 === 0 && (
        <text x={x} y="40" fill={textColor} fontSize={unitNoteWidth * 0.7}>
          {noteToPitchOctave(props.noteNum)}
        </text>
      )}
    </g>
  );
}

export function Keyboard() {
  const selectedNotes = useAppSelector(selectNotes);
  const items = [];
  for (let i = 0; i < 128; i++) {
    const selected = selectedNotes.includes(i);
    items.push(<SingleKey key={String(i)} noteNum={i} selected={selected} />);
  }

  const width = 128 * unitNoteWidth;
  const height = 50;
  const viewBox = `0 0 ${width} ${height}`;

  return (
    <div className={styles.keyboard}>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {items}
      </svg>
    </div>
  );
}
