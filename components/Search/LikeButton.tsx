import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import useAuthModal from '@/hooks/useAuthModal';
import { useUserState } from '@/hooks/useUser';
import { Song } from '@/types';
import { toast } from 'react-hot-toast';

interface LikeButtonProps {
  songId: string;
}
const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const router = useRouter();
  const authModal = useAuthModal();
  const { user } = useUserState();
  const { supabaseClient } = useSessionContext();
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
  // handler function
  const clickHandler = async () => {
    /**
     * In the click handler functions we have to write the three functionality
     * 1) If the user is not their then open the auth modal
     * 2) if the songs is liked then we have to delete the song from the database and setisLiked song to true
     * 3) if the song is not liked then we have to insert the song to the database and setis Liked to true
     */
    if (!user) {
      authModal.onOpen();
    }
    if (user && isLiked) {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user?.id)
        .eq('song_id', songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error, data } = await supabaseClient.from('liked_songs').insert({
        user_id: user?.id,
        song_id: songId,
      });
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success('You have Liked a Song');
      }
    }
    router.refresh();
  };
  //useEffect
  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [songId, user?.id, supabaseClient]);
  return (
    <button
      className='
    hover:opacity-70
    transition
    '
      onClick={clickHandler}
    >
      <Icon size={26} color={isLiked ? 'red' : 'white'} />
    </button>
  );
};

export default LikeButton;
