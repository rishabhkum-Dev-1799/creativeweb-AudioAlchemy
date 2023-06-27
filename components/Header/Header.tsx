'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft } from 'react-icons/rx';
import { RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Button from '../UI/Button/Button';
import { FaUserAlt } from 'react-icons/fa';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import useAuthModal from '@/hooks/useAuthModal';
import { useUserState } from '@/hooks/useUser';
interface headerProps {
  children: React.ReactNode;
  styleName?: string;
}
const Header: React.FC<headerProps> = ({ children, styleName }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const { user } = useUserState();
  const supabaseClient = useSupabaseClient();
  // handler functions
  const onback = () => {
    router.back();
  };
  const onForward = () => {
    router.forward();
  };
  const searchbtnHandler = () => {
    router.push('/search');
  };
  const homebtnHandler = () => {
    router.push('/');
  };
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //TODO:- Player remove functionality

    router.refresh();
    //TODO:-Toaster to be added:-
    if (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-indigo-400 p-6`,
        styleName
      )}
    >
      <div className='w-full mb-4 flex items-center justify-between'>
        <div className='hidden md:flex items-center gap-x-2'>
          <button
            className='bg-black rounded-full flex justify-center items-center hover:opacity-75 transition cursor-pointer'
            onClick={onback}
          >
            <RxCaretLeft size={35} className='text-white' />
          </button>
          <button
            className='bg-black rounded-full flex justify-center items-center hover:opacity-75 transition cursor-pointer'
            onClick={onForward}
          >
            <RxCaretRight size={35} className='text-white' />
          </button>
        </div>
        <div className='md:hidden flex gap-x-2 items-center'>
          <button
            onClick={homebtnHandler}
            className='bg-white rounded-full flex items-center justify-center p-2 cursor-pointer hover:opacity-75 transition'
          >
            <HiHome size={26} />
          </button>
          <button
            onClick={searchbtnHandler}
            className='bg-white rounded-full flex items-center justify-center p-2 cursor-pointer hover:opacity-75 transition'
          >
            <BiSearch size={26} />
          </button>
        </div>
        <div className='flex items-center justify-between gap-x-4'>
          {user ? (
            <>
              <div className='flex items-center gap-x-4'>
                <Button className='bg-white px-6 py-2' onClick={handleLogout}>
                  Logout
                </Button>
                <Button
                  className='bg-white '
                  onClick={() => router.push('/account')}
                >
                  <FaUserAlt />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Button
                  className='bg-transparent text-neutral-300 font-medium'
                  onClick={authModal.onOpen}
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  className='bg-white px-6 py-2'
                  onClick={authModal.onOpen}
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
