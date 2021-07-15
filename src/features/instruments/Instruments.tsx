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

// export function Counter() {
//   const count = useAppSelector(selectCount);
//   const dispatch = useAppDispatch();
//   const [incrementAmount, setIncrementAmount] = useState('2');  // 関数コンポーネント内のlocal state

//   const incrementValue = Number(incrementAmount) || 0;

//   return (
//     <div>
//       <div>
//         <button
//           aria-label="Decrement value"
//           onClick={() => dispatch(decrement())}
//         >
//           -
//         </button>
//         <span>{count}</span>
//         <button
//           aria-label="Increment value"
//           onClick={() => dispatch(increment())}
//         >
//           +
//         </button>
//       </div>
//       <div>
//         <input
//           aria-label="Set increment amount"
//           value={incrementAmount}
//           onChange={(e) => setIncrementAmount(e.target.value)}
//         />
//         <button
//           onClick={() => dispatch(incrementByAmount(incrementValue))}
//         >
//           Add Amount
//         </button>
//         <button
//           onClick={() => dispatch(incrementIfOdd(incrementValue))}
//         >
//           Add If Odd
//         </button>
//       </div>
//     </div>
//   );
// }
