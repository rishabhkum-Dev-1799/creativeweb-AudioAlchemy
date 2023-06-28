import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Song } from '@/types';
import { data } from 'autoprefixer';
const useImagePath = (song: Song) => {
  const supabase = useSupabaseClient();

  const { data: imageData } = supabase.storage
    .from('images')
    .getPublicUrl(song.image_path);

  if (!imageData) {
    return null;
  }
  return imageData.publicUrl;
};
export default useImagePath;
