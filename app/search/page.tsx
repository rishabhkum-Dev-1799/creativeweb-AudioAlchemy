import Header from '@/components/Header/Header';
import SearchContent from '@/components/Search/SearchContent';
import SearchInput from '@/components/Search/SearchInput';
import { getSongsByTitle } from '@/helpers/getSongsByTitle';

const revalidate = 0;
interface SearchPageProps {
  searchParams: {
    title: string;
  };
}

const Search = async ({ searchParams }: SearchPageProps) => {
  const searchedSongs = await getSongsByTitle(searchParams.title);
  return (
    <div>
      <Header>
        <div className='flex flex-col mb-2 gap-y-6'>
          <h1 className='text-white text-2xl font-semibold'>Search</h1>
        </div>
        <SearchInput />
      </Header>
      <SearchContent searchedSongs={searchedSongs} />
    </div>
  );
};

export default Search;
