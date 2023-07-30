'use client';
import SongItem from '@/components/Home/SongItem';
import useOnPlay from '@/hooks/useOnPlay';
import usePlayer from '@/hooks/usePlayer';
import { Song } from '@/types';
import React from 'react';
import { on } from 'stream';

interface SongListProps {
  songs: Song[];
}
const SongsList: React.FC<SongListProps> = ({ songs }) => {
  // use Player
  const onPlay = useOnPlay(songs);
  const clickHandler = (id: string) => {
    onPlay(id);
  };
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
