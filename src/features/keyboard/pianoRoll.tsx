import React, { useEffect, useRef } from 'react';
import { Keyboard } from './keyboard';
import { RangeCanvas } from './soundRange';
import { useAppDispatch } from '../../app/hooks';
import { clear } from './keyboardSlice';
import styles from './pianoRoll.module.css';

export function PianoRoll() {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  // 読み込み時にスクロール位置を設定
  useEffect(() => {
    ref.current?.scrollTo(150, 0);
  });

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={styles.svgCanvas}
      ref={ref}
      onMouseDown={() => dispatch(clear())}
    >
      <Keyboard />
      <RangeCanvas />
    </div>
  );
}
