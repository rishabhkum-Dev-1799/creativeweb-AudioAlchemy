import './globals.css';
import { Figtree } from 'next/font/google';
import Sidebar from '@/components/Sidebar/Sidebar';
import SupabaseProvider from '@/providers/Supabase/SupabaseProvider';
import UserProvider from '@/providers/Users/UserProvider';
import ModalProvider from '@/providers/Modal/ModalProvider';
import ToasterProvider from '@/providers/Toaster/ToasterProvider';
import { getSongsByUserId } from '@/helpers/getSongsByUserId';
import Player from '@/components/Player/Player';

const font = Figtree({ subsets: ['latin'] });

const revalidate = 0;
export const metadata = {
  title: 'AudioAlchemy',
  description: 'Generated by CreatedWeb-by Rishabh',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
