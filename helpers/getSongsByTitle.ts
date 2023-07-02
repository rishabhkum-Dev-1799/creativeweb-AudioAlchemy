import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getSongsByTitle = async (title: string): Promise<Song[]> => {
    const supabaseClient = createServerComponentClient({
        cookies: cookies
    });
    const { data, error } = await supabaseClient.from('songs').select('*').ilike('title', `%${title}%`).order('created_at', { ascending: true });

    if (error) {
        console.log('Error in getSongsByTitle:', error.message);
        return [];
    }
    return (data as any) || [];
};