'use-client';
import React from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import useImagePath from '@/hooks/useImagePath';
import { Song } from '@/types';

interface SongItemProps {
  song: Song;
  onClick: (id: string) => void;
}
const SongItem: React.FC<SongItemProps> = ({ song, onClick }) => {
  const imageUrl = useImagePath(song);
  return (
    <>
      <div
        onClick={() => onClick(song.id)}
        className='
      relative
      group
      flex
      flex-col
      items-center
      justify-center
      rounded-md
      overflow-hidden
      bg-neutral-400/10
      hover:bg-neutral-400/20
      cursor-pointer
      p-3
      '
      >
        <div
          className='
        relative
        aspect-square
        w-full
        h-full
        rounded-md
        overflow-hidden'
        >
          <Image
            className='object-cover'
            src={imageUrl || '/images/liked.png'}
            fill
            alt='song_image'
          />
        </div>
        <div className='flex flex-col gap-y-1 pt-1 items-start text-white w-full'>
          <p className='font-semibold truncate w-full'>{song.title}</p>
          <p className=' text-sm text-neutral-400 pb-4 truncate w-full'>
            By {song.author}
          </p>
        </div>
        <div className='  absolute right-5 bottom-20 flex items-center justify-center rounded-full p-4 bg-indigo-500 opacity-0 group-hover:opacity-100 hover:scale-110 transition'>
          <FaPlay className='text-black' />
        </div>
      </div>
    </>
  );
};

export default SongItem;
