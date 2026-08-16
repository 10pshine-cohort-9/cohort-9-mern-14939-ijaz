import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

function Button({ variant = "primary", children, ...props }: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-moss text-white hover:bg-moss-hover"
      : "bg-sand text-ink hover:bg-neutral-300";

  return (
    <button className={`px-4 py-2 rounded-md font-medium ${styles}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
