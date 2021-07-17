import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toggle, selectInstruments } from './instrumentsSlice';
import styles from './Instruments.module.css';

interface DisplayItem {
  name: string;
  selected: boolean;
}

function InstrumentRow(props: DisplayItem) {
  const dispatch = useAppDispatch(); // Redux storeへのdispatch

  return (
    <div className={styles.row}>
      <input
        type="checkbox"
        checked={props.selected}
        onChange={() => dispatch(toggle(props.name))}
      />
      <span className={styles.rowText}>{props.name}</span>
    </div>
  );
}

export function Instruments() {
  const instruments = useAppSelector(selectInstruments); // Redux store stateから値を読み出すための関数
  const items = instruments.map((instrument) => (
    <InstrumentRow
      key={instrument.name}
      name={instrument.name}
      selected={instrument.selected}
    />
  ));

  return <div className={styles.list}>{items}</div>;
}
