'use client';

import { useEffect, useState} from 'react';

import {usePathname, useRouter} from 'next/navigation';
import useDebounce from '@/hooks/useDebounce';
import InputCustom from "@/components/input/InputCustom";
import {RiSearch2Fill} from "react-icons/ri";
import useSearch from "@/hooks/useSearch";

export default function Search() {
  const [value, setValue] = useState<string>('');
  const debounced = useDebounce(value);
  const search = useSearch()
  const { push } = useRouter();
  const pathname = usePathname()
  const sendValue = () => {
    push(`?search=${debounced}`);
  };
        const handleChange =(value:string)=>{
            setValue(value)
        }
    useEffect(() => {
        if (search)
            setValue(search)
    }, [search]);

        useEffect(()=>{
            const timeout = setTimeout(()=>{
                if (value.length === 0){
                    push(pathname)
                }
            },500)
            return ()=> clearTimeout(timeout)
        },[value])
  return (
    <div className={'flex relative justify-center items-center'}>
        <InputCustom value={value} placeholder={'Поиск...'}  endContent={<button
            disabled={value.length === 0}
            onClick={sendValue}
            className={
                ' cursor-pointer   text-text border-l border-text w-[40px] rounded-r-md h-full text-xl flex justify-center   items-center  hover:text-2xl disabled:text-xl disabled:text-text-dark/70 '
            }
        >
            <RiSearch2Fill />
        </button>} onValueChange={(value) => handleChange(value)}/>

    </div>
  );
}
