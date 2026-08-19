import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

function Button({ variant = "primary", children, ...props }: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-moss text-white hover:bg-moss-hover"
      : variant === "ghost"
        ? "text-ink/70 hover:text-clay hover:bg-clay/5"
        : "bg-sand text-ink hover:bg-neutral-300";

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium cursor-pointer transition-colors active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${styles}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
