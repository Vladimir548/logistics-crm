import React, { useEffect, useState} from "react";

import { Command } from "@/components/command/Command";

import { Input } from "@nextui-org/react";
import {CiSearch} from "react-icons/ci";
import { useComboboxSearch } from "@/zustand/useComboboxSearch";
import useDebounce from "@/hooks/useDebounce";

import useInfiniteCustom from "@/hooks/useInfiniteCustom";
import {QueryKey} from "@tanstack/react-query";

import ComboboxFiltersList from "@/components/combobox/ComboboxFiltersList";

interface SelectInputProps {
    isLoading?: boolean;
    nameField: string;
    queryFn: ( pageParam:number, search:string ) => Promise<any>;
    queryKey: QueryKey;
    value:number[],
    setValue:(value:number)=>void
}

export default function ComboboxFilters({  queryFn, queryKey, nameField,value,setValue}: SelectInputProps) {
    const [search, setSearch] = useState('');
    const debounce = useDebounce(search, 500);
    const { getSearch } = useComboboxSearch();

    useEffect(() => {
        getSearch(debounce);
    }, [debounce, getSearch]);

    const { count, items, isFetchingNextPage, hasNextPage, fetchNextPage, isFetching } = useInfiniteCustom({
        queryKey: queryKey,
        queryFn: ( pageParam:number,search?:string ) => queryFn( pageParam, search ? search :'' ),
        nameField: nameField,
        search: debounce,
    });
    return (

                <Command className={'w-full'}>
                    <div className={'w-full flex items-center justify-between'}>
                        <Input isClearable value={search} onValueChange={(val) => setSearch(val)}
                               startContent={<CiSearch className="mr-2 h-5 w-5 shrink-0 text-text " />} classNames={{
                            inputWrapper: 'border-border  data-[hover=true]:border-border after:bg-text',
                            innerWrapper: 'pb-0',
                            input: 'text-text group-data-[has-value=true]:text-text placeholder:text-text'
                        }} type={'text'} placeholder={'Поиск...'} className={'border-border text-text mb-1 pr-1'} variant={'underlined'} />
                    </div>
                    <ComboboxFiltersList
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        isFetching={isFetching}
                        items={items}
                        dataCount={count ? count : 0}
                        setValue={(value) => setValue(value)}
                        values={value}

                    />
                </Command>

    );
}
