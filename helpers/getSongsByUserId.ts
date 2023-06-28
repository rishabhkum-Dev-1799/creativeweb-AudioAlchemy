import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getSongsByUserId = async (): Promise<Song[]> => {
    const supabaseClient = createServerComponentClient({
        cookies: cookies
    })
    const { data: serverData, error: serverError } = await supabaseClient.auth.getSession();
    if (serverError) {
        console.log("Error in getting the current Session:", serverError.message);
        return [];
    }

    const { data, error } = await supabaseClient.from('songs').select('*').eq('user_id', serverData.session?.user?.id).order('created_at', { ascending: true });
    if (error) {
        console.log("Error in fetching songs for the session user_id:", error.message);
        return [];
    }
    return (data as any) || null;
};