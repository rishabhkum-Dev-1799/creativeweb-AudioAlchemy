import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BoxProps {
  children: React.ReactNode;
  styleName?: string;
}
const Box: React.FC<BoxProps> = ({ children, styleName }) => {
  return (
    <div
      className={twMerge(
        `bg-neutral-900 rounded-lg h-fit w-full text-white`,
        styleName
      )}
    >
      {children}
    </div>
  );
};

export default Box;
