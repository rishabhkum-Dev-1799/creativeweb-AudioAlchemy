import { Song } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';

const useGetSongUrl = (song: Song) => {
  const { supabaseClient } = useSessionContext();
  if (!song) {
    return null;
  }
  const { data: SongData } = supabaseClient.storage
    .from('songs')
    .getPublicUrl(song.song_path);

  return SongData.publicUrl;
};

export default useGetSongUrl;
