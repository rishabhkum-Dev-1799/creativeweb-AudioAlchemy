import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        disabled={disabled}
        ref={ref}
        {...props}
        className={twMerge(
          `
        flex
        w-full
        rounded-md
        p-3
        bg-neutral-700
        border
        border-transparent
        text-sm
        placeholder:text-neutral-400
        file:border-0 
        file:bg-transparent 
        file:text-sm 
        file:font-medium 
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus:outline-none
        `,
          className
        )}
      ></input>
    );
  }
);

Input.displayName = 'Input';

export default Input;
