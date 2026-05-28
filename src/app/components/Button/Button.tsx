// components/Button/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from "react";

import "./styles.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: "small" | "medium" | "large";
}

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}: ButtonProps) => {
  // On génère dynamiquement les classes en fonction des props
  const buttonClass = `btn btn--${variant} btn--${size} ${className}`.trim();

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
