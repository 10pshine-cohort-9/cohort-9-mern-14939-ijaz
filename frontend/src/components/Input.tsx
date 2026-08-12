function Input({
  label,
  id,
  error = "",
  ...props
}: {
  label: string;
  id: string;
  error?: string;
  [key: string]: any;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-graphite">
        {label}
      </label>
      <input
        id={id}
        className={`px-3 py-2 rounded-md border ${error ? "border-clay" : "border-sand"}`}
        {...props}
      />
      {error && <span className="text-sm text-clay">{error}</span>}
    </div>
  );
}

export default Input;
