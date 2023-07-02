import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import next from "next";
import { cookies } from 'next/headers';
import { isTemplateExpression } from "typescript";
const getLikedSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    const { data, error } = await supabase.from('liked_songs').select('*,songs(*)').eq('user_id', sessionData.session?.user.id).order('created_at', { ascending: true });
    if (error) {
        console.log('error in getLikedSongs helper function', error.message)
        return [];
    }
    if (!data) {
        console.log('Data returned is empty in the getLikedSongs');
        return [];
    }


    return data.map((item) => ({ ...item?.songs }));
};

export default getLikedSongs;