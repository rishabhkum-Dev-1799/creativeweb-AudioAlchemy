import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface SideBarItemProps {
  icon: IconType;
  label: string;
  active: boolean;
  href: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <>
      <Link
        href={href}
        className={twMerge(
          `flex flex-row gap-x-4 h-auto items-center w-full cursor-pointer text-md hover:text-white font-medium text-neutral-400 py-2`,
          active && 'text-white '
        )}
      >
        <Icon size={26} />
        <p>{label}</p>
      </Link>
    </>
  );
};

export default SideBarItem;
