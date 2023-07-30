import { Song } from '@/types';
import useAuthModal from './useAuthModal';
import usePlayer from './usePlayer';
import { useUserState } from './useUser';

const useOnPlay = (songs: Song[]) => {
  // use on Play has is the hook which will have onPlay method which will act like authorizer if the user is not thier and if its their then it will in the state will assign the active id and also through the songs array it will fill the setIds
  const { user } = useUserState();
  const authModal = useAuthModal();
  const player = usePlayer();
  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    player.setActiveId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
