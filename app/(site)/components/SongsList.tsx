'use client';
import SongItem from '@/components/Home/SongItem';
import { Song } from '@/types';
import React from 'react';

interface SongListProps {
  songs: Song[];
}
const SongsList: React.FC<SongListProps> = ({ songs }) => {
  const clickHandler = () => {};
  return (
    <>
      <div
        className='
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
    '
      >
        {songs.map((song, i) => {
          return (
            <>
              <SongItem key={i} song={song} onClick={clickHandler} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default SongsList;
