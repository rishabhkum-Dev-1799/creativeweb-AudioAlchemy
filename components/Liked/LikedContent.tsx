'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useUserState } from '@/hooks/useUser';
import { Song } from '@/types';
import MediaItem from '../Sidebar/MediaItem';
import LikeButton from '../Search/LikeButton';

interface LikedContentProps {
  songs: Song[];
}
const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const { isLoading, user } = useUserState();
  const router = useRouter();
  // function handlers
  const clickHandler = () => {
    // TODO :turn on player functionality
  };
  // \SideEffecthandlings
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <>
        <div className='flex flex-col px-6 gap-y-2 w-full text-neutral-600'>
          No Liked Songs
        </div>
      </>
    );
  }
  return (
    <div className='w-full flex flex-col p-6 mt-4 text-white'>
      {songs.map((song, i) => {
        return (
          <React.Fragment key={i}>
            <div key={i} className='flex w-full gap-x-4 items-center'>
              <div className='flex-1'>
                <MediaItem song={song} onClick={clickHandler} />
              </div>
              <LikeButton songId={song.id} />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LikedContent;
