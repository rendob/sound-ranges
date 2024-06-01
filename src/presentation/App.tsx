import { useGetInstrumentsUseCase } from "../application/useCase/getInstruments";
import { useToggleInstrumentSelectionUseCase } from "../application/useCase/toggleInstrumentSelection";

function App() {
  const getInstruments = useGetInstrumentsUseCase();
  const toggleInstrumentSelection = useToggleInstrumentSelectionUseCase();

  const instruments = getInstruments();

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        {instruments.map((instrument) => (
          <div key={instrument.id} style={{ display: "flex" }}>
            <input
              type="checkbox"
              checked={instrument.isSelected}
              onChange={() => toggleInstrumentSelection(instrument.id)}
            />
            <p>
              {instrument.name} {String(instrument.isSelected)}
            </p>
          </div>
        ))}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
