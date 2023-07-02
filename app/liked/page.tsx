import Image from 'next/image';

import Header from '@/components/Header/Header';
import getLikedSongs from '@/helpers/getLikedSongs';
import LikedContent from '@/components/Liked/LikedContent';

const revalidate = 0;
const Liked = async () => {
  const likedSongs = await getLikedSongs();

  return (
    <>
      <div className='h-full w-full overflow-hidden overflow-y-auto'>
        <Header>
          <div className='mt-20'>
            <div className='flex  flex-col md:flex-row gap-x-4 items-center'>
              <div className='relative h-32 w-32 lg:h-44 lg:w-44'>
                <Image
                  src='/images/liked.png'
                  alt='liked_png'
                  className='object-cover'
                  fill
                />
              </div>
              <div className='flex flex-col justify-center gap-y-2 text-white mt-4 md:mt-0'>
                <p className='hidden md:block text-sm font-semibold'>
                  Playlist
                </p>
                <h1 className='font-bold text-4xl sm:text-5xl lg:text-5xl'>
                  LikedSongs
                </h1>
              </div>
            </div>
          </div>
        </Header>
        <LikedContent songs={likedSongs} />
      </div>
    </>
  );
};

export default Liked;
