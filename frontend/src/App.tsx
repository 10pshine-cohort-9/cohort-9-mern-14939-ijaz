import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-2xl mb-4">Preview</h1>
      <Input label="Email" id="email" placeholder="you@example.com" />
      <div className="h-4" />
      <Input label="Password" id="password" type="password" error="Too short" />
      <div className="h-4" />
      <Button>Continue</Button>
    </div>
  );
}

export default App;
