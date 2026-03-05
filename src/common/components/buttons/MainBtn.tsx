import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "ghost" | "outline";

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses = `
 flex items-center justify-center
  rounded-pill
  text-sm font-semibold
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-offset-2
`;

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-primary text-white
    px-5 py-2.5
    shadow-soft
    hover:brightness-110
    focus-visible:ring-primary
    focus-visible:ring-offset-bg-page
  `,
  ghost: `
    bg-transparent text-primary
    px-3 py-2
    hover:bg-primary-soft/60
    focus-visible:ring-primary
    focus-visible:ring-offset-bg-page
  `,
  outline: `
    border border-border-subtle
    text-text-main
    bg-bg-surface
    px-4 py-2
    hover:bg-bg-page
    focus-visible:ring-primary
    focus-visible:ring-offset-bg-page
  `,
};

const MainBtn: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={twMerge(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default MainBtn;
