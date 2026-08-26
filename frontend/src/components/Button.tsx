import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

function getButtonStyles(variant: ButtonVariant): string {
  if (variant === "primary") return "bg-moss text-white hover:bg-moss-hover";
  if (variant === "ghost") return "text-ink/70 hover:text-clay hover:bg-clay/5";
  return "bg-sand text-ink hover:bg-neutral-300";
}

function Button({
  variant = "primary",
  children,
  ...props
}: Readonly<ButtonProps>) {
  const styles = getButtonStyles(variant);

  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-md font-medium cursor-pointer transition-colors active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${styles}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
