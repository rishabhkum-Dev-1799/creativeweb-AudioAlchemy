'use client';
import React from 'react';

import usePlayer from '@/hooks/usePlayer';
import useGetSongById from '@/hooks/useGetSongById';
import useGetSongUrl from '@/hooks/useGetSongUrl';

const Player = () => {
  const player = usePlayer();
  const { song, isLoading } = useGetSongById(player.activeId);
  // getting the Song Url
  const songUrl = useGetSongUrl(song!);

  if (!song || !songUrl || !player) {
    return null;
  }

  return (
    <div className='fixed bottom-0 h-[80px] bg-black text-white w-full py-2 px-4'>
      <div>Hello</div>
    </div>
  );
};

export default Player;
