import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';

const SongLibrary = () => {
  const addSong = () => {};
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex gap-x-2 items-center'>
          <TbPlaylist size={26} className='text-neutral-400' />
          <p className='text-neutral-400 font-medium text-md'>Your Library</p>
        </div>
        <AiOutlinePlus
          size={26}
          onClick={addSong}
          className='text-neutral-400 hover:text-white transition'
        />
      </div>
      <div className='flex flex-col px-5 mt-4 gap-y-2'>List of Songs</div>
    </div>
  );
};

export default SongLibrary;
