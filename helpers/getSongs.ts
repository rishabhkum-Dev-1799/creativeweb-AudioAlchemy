import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import next from "next";
import { cookies } from 'next/headers';
const getSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase.from('songs').select('*').order('created_at', { ascending: true });
    if (error) {
        console.log(error.message);
    }
    return (data as any) || [];
};

export default getSongs;