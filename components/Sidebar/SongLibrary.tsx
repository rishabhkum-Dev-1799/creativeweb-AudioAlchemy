import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';

import useAuthModal from '@/hooks/useAuthModal';
import { useUserState } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';

const SongLibrary = () => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUserState();
  // function handlers
  const addSong = () => {
    if (!user) {
      return authModal.onOpen();
    }

    // TODO : Subscription functionality to be added
    return uploadModal.onOpen();
  };
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
          className='text-neutral-400 hover:text-white transition cursor-pointer'
        />
      </div>
      <div className='flex flex-col px-5 mt-4 gap-y-2'>List of Songs</div>
    </div>
  );
};

export default SongLibrary;
