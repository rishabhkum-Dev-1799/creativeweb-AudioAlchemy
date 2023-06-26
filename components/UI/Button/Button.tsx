import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = 'button', ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `
        w-full
        rounded-full
        bg-indigo-600
        text-black
        py-3
        px-3
        hover:opacity-75
        transistion
        font-bold
        disabled:cursor-not-allowed
        disabled:opacity-50`,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
