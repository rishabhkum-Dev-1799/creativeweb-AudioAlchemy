import Header from '@/components/Header/Header';
import ListItem from '@/components/Home/ListItem';
export default function Home() {
  return (
    <div className='bg-neutral-900 h-full w-full rounded-lg overflow-hidden overflow-y-auto'>
      <Header>
        <div className='mb-2'>
          <h1 className='text-white text-3xl font-semibold'>Welcome back</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4 gap-3'>
            <ListItem name='LikedSongs' href='liked' />
          </div>
        </div>
      </Header>
      <div className='mt-2 mb-7 px-6 '>
        <div className='flex justify-between items-center'>
          <h1 className='text-white text-2xl font-semibold'>Newest Songs</h1>
        </div>
        <div>List of Songs</div>
      </div>
    </div>
  );
}
