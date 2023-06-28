import useImagePath from '@/hooks/useImagePath';
import { Song } from '@/types';
import { data } from 'autoprefixer';
import Image from 'next/image';
import React from 'react';

interface MediaItemProps {
  song: Song;
  onClick: (id: string) => void;
}
const MediaItem: React.FC<MediaItemProps> = ({ onClick, song }) => {
  const handleClick = () => {};
  const image = useImagePath(song);
  return (
    <div
      onClick={handleClick}
      className='
    flex 
    items-center
    gap-x-3
    hover:bg-neutral-800/80
    rounded-md
    p-2
    w-full
    '
    >
      <div className=' relative min-h-[48px] min-w-[48px] rounded-md overflow-hidden'>
        <Image
          className='object-cover'
          src={image || './images/liked.png'}
          alt='song_image'
          fill
        />
      </div>
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <p className='text-white truncate'>{song.title}</p>
        <p className='text-neutral-400 text-sm truncate'>By {song.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
