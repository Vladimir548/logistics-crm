'use client';

import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import useDebounce from '@/hooks/useDebounce';

export default function Search() {
  const [value, setValue] = useState<string>('');
  const debounced = useDebounce(value);

  const { push } = useRouter();
  const sendValue = () => {
    push(`?q=${debounced}`);

  };

  return (
    <div className={'flex relative justify-center items-center'}>
      <input
        className={
          ' border border-border pl-1 text-text outline-0 rounded-md p-1 pr-[35px] h-[40px]  bg-transparent focus:bg-border/30'
        }
        type="text"
        value={value}
        placeholder={'Поиск...'}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
          disabled={value.length === 0}
          onClick={sendValue}
        className={
          'absolute cursor-pointer  top-0 text-text right-0 border-l border-text w-[40px] rounded-r-md h-full text-xl flex justify-center   items-center hover:bg-text-dark/40 hover:text-2xl disabled:cursor-not-allowed'
        }
      >
        <CiSearch  />
      </button>
    </div>
  );
}
