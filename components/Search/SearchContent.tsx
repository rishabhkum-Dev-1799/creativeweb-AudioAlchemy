'use client';
import { Song } from '@/types';
import React from 'react';
import MediaItem from '../Sidebar/MediaItem';
import LikeButton from './LikeButton';

interface SearchContentProps {
  searchedSongs: Song[];
}
const SearchContent: React.FC<SearchContentProps> = ({ searchedSongs }) => {
  if (searchedSongs.length === 0) {
    return (
      <div
        className='
                flex
                flex-col
                gap-y-2
                w-full
                p-6
                text-neutral-600
            '
      >
        No Songs Found
      </div>
    );
  }
  return (
    <div
      className='
    flex
    flex-col
    w-full
    gap-y-4
    px-6'
    >
      {searchedSongs.map((song, i) => {
        return (
          <div
            key={i}
            className='
            flex 
            items-center
            gap-x-4
            w-full
            '
          >
            <div className='flex-1'>
              <MediaItem song={song} onClick={() => {}} />
            </div>
            <LikeButton songId={song.id} />
          </div>
          //TODO:- Player functionality and Like Functionality to be added
        );
      })}
    </div>
  );
};

export default SearchContent;
