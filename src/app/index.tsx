import { Button, ButtonVariant } from "../_components/Button";

export const App: React.FC = () => {
  return (
    <main className="p-4">
      App
      <div className="space-x-2">
        <Button variant={ButtonVariant.FILLED}>Filled</Button>
        <Button variant={ButtonVariant.OUTLINED}>Outlined</Button>
        <Button variant={ButtonVariant.DESTRUCTIVE}>Destructive</Button>
      </div>
    </main>
  );
};
