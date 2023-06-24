'use client';
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from './Box';
import SideBarItem from './SideBarItem';
import SongLibrary from './SongLibrary';
interface SideBarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SideBarProps> = ({ children }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
      },
    ],
    [pathname]
  );
  return (
    <>
      <div className='flex h-full'>
        <div
          className='
        hidden
        md:flex
        flex-col
            gap-y-2
            bg-black
            h-full
            w-[300px]
            p-2
        '
        >
          <Box>
            <div className='flex flex-col gap-y-4 px-5 py-4'>
              {routes.map((item, i) => (
                <SideBarItem key={i} {...item} />
              ))}
            </div>
          </Box>
          <Box styleName='overflow-y-auto h-full'>
            <SongLibrary />
          </Box>
        </div>
        <main className='h-full flex-1 overflow-y-hidden py-2'>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
