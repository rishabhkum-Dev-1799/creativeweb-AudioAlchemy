'use client';
import { useState, useEffect, useMemo } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';

import { Song } from '@/types';

// this is just the hook which which will get the data from the supbase using the client side and we just making the fetch call;
const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | null>(null);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        setIsLoading(false);
      }
      setSong(data as Song);
      setIsLoading(false);
    };
    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
