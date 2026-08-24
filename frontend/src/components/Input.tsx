import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ label, id, error = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-graphite">
        {label}
      </label>
      <input
        id={id}
        className={`px-3 py-2 rounded-md border outline-none focus:ring-2 focus:ring-moss transition-shadow ${
          error ? "border-clay" : "border-sand"
        }`}
        {...props}
      />
      {error && <span className="text-sm text-clay">{error}</span>}
    </div>
  );
}

export default Input;
