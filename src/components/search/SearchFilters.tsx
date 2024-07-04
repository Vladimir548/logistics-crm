'use client';

import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useGetValueFilters } from '@/zustand/useGetValueFilters';

interface ISearchFilters {
  type: 'carrier' | 'costumer';
}
export default function SearchFilters({ type }: ISearchFilters) {
  const [value, setValue] = useState<string>('');
  const debounced = useDebounce(value);
  const { getValueCarrier, getValueCostumer } = useGetValueFilters();
  useEffect(() => {
    if (type === 'costumer') return getValueCostumer(debounced.trim());
    if (type === 'carrier') return getValueCarrier(debounced.trim());
  }, [debounced]);

  return (
    <div className={'flex relative justify-center items-center'}>
      <input
        className={
          ' border w-full border-[#748db2] outline-0 rounded-md p-1 pr-[35px]  bg-transparent focus:bg-[#34455d]'
        }
        type="text"
        value={value}
        placeholder={'Поиск...'}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
