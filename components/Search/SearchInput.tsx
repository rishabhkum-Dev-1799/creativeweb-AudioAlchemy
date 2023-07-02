'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

import useDebounce from '@/hooks/useDebounce';
import Input from '../UI/Input/Input';

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const router = useRouter();
  const searchDebouncedValue = useDebounce<string>(searchValue, 500);
  //handler functions
  const inputHandler = (event: any) => {
    setSearchValue(event?.target?.value);
  };
  useEffect(() => {
    const query = {
      title: searchDebouncedValue,
    };
    const url = qs.stringifyUrl({
      url: '/search',
      query: query,
    });
    router.push(url);
  }, [searchDebouncedValue, router]);

  return (
    <Input
      placeholder='What do you want to listen to?'
      value={searchValue}
      onChange={inputHandler}
    />
  );
};

export default SearchInput;
