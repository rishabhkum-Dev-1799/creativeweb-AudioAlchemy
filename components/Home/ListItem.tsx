'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

import { useUserState } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';
import likedImage from '../../public/images/liked.png';
interface ListItemProps {
  name: string;
  href: string;
}
const ListItem: React.FC<ListItemProps> = ({ name, image, href }) => {
  const router = useRouter();
  const { user } = useUserState();
  const authModal = useAuthModal();
  //handler functions
  const likeHandler = () => {
    if (!user) {
      return authModal.onOpen();
    }
    router.push(href);
  };
  return (
    <button
      onClick={likeHandler}
      className='flex items-center gap-x-4 rounded-md relative group bg-neutral-100/10 hover:bg-neutral-100/20 transistion cursor-pointer pr-4 overflow-hidden'
    >
      <div className='relative min-h-[64px] min-w-[64px]'>
        <Image src={likedImage} alt='like_song' fill className='object-cover' />
      </div>
      <p className='text-white font-medium truncate py-5'>{name}</p>
      <div className='  absolute right-5 flex items-center justify-center rounded-full p-4 bg-indigo-500 opacity-0 group-hover:opacity-100 hover:scale-110 transition'>
        <FaPlay className='text-black' />
      </div>
    </button>
  );
};

export default ListItem;
