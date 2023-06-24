import './globals.css';
import { Figtree } from 'next/font/google';
import Sidebar from '@/components/Sidebar/Sidebar';
import SupabaseProvider from '@/providers/Supabase/SupabaseProvider';
import UserProvider from '@/providers/Users/UserProvider';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'AudioAlchemy',
  description: 'Generated by CreatedWeb-by Rishabh',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
