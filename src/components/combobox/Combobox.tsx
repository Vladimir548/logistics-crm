import React, {ReactElement, useEffect, useMemo, useState} from "react";
import { Button } from "@/components/buttons/Buttons";
import { Command } from "@/components/command/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover/Popover";
import { FaSortDown } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import {CiSearch} from "react-icons/ci";
import { useComboboxSearch } from "@/zustand/useComboboxSearch";
import useDebounce from "@/hooks/useDebounce";

import useInfiniteCustom from "@/hooks/useInfiniteCustom";
import {QueryKey} from "@tanstack/react-query";
import SelectAdd from "@/components/select/SelectAdd";
import ComboboxList from "@/components/combobox/ComboboxList";
export interface ISelectItem {
    id: number;
    name: string;
}
interface SelectInputProps {
    onValueChange: (value: number) => void;
    controllerValue: string;
    label?: string;
    isLoading?: boolean;
    disabled?: boolean;
    nameField: string;
    queryFn: ( pageParam:number, search:string ) => Promise<any>;
    queryKey: QueryKey;
    addRecord:ReactElement
    enabled?: boolean
}

export default function Combobox({controllerValue, disabled, onValueChange, queryFn, queryKey, nameField, label, addRecord,enabled}: SelectInputProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number>(Number(controllerValue));
    const [search, setSearch] = useState('');
    const debounce = useDebounce(search, 500);
    const { getSearch } = useComboboxSearch();

    useEffect(() => {
        getSearch(debounce);
    }, [debounce, getSearch]);

    useEffect(() => {
        if (controllerValue && Number(controllerValue) !== value) {
            setValue(Number(controllerValue));
        }
    }, [controllerValue, value]);

    const { count, items, isFetchingNextPage, hasNextPage, fetchNextPage, isFetching } = useInfiniteCustom({
        queryKey: queryKey,
        queryFn: ( pageParam:number,search?:string ) => queryFn( pageParam, search ? search :'' ),
        nameField: nameField,
        search: debounce,
        enabled:enabled
    });

    const findCurrentItem = useMemo(()=> {
       return  items.find(item => item.id === Number(value))?.name
    }, [value,controllerValue]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger disabled={disabled} asChild>
                <Button
                    variant="default"
                    role="combobox"
                    aria-expanded={open}
                    className="min-w-[300px] w-full h-[56px] flex items-center justify-between hover:border-border"
                >
                    <span className={` ${value ? 'text-text' : 'text-text-dark'} `}>{value ? findCurrentItem ? findCurrentItem : label : label}</span>
                    <span>
                        <FaSortDown className={`flex ${value && 'text-text'} justify-end ml-2 h-5 w-5 shrink-0 hover:text-text`} />
                    </span>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="min-w-[300px] w-full p-1 z-50 backdrop-blur-2xl border border-border">
                <Command className={'w-full'}>
                    <div className={'w-full flex items-center justify-between'}>
                    <Input isClearable value={search} onValueChange={(val) => setSearch(val)}
                           startContent={<CiSearch className="mr-2 h-5 w-5 shrink-0 text-text " />} classNames={{
                        inputWrapper: 'border-border  data-[hover=true]:border-border after:bg-text',
                        innerWrapper: 'pb-0',
                        input: 'text-text group-data-[has-value=true]:text-text placeholder:text-text'
                    }} type={'text'} placeholder={'Поиск...'} className={'border-border text-text mb-1 pr-1'} variant={'underlined'} />
                   <SelectAdd element={addRecord} />
                    </div>
                    <ComboboxList
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        isFetching={isFetching}
                        items={items}
                        dataCount={count ? count : 0}
                        setOpen={(value) => setOpen(value)}
                        setValue={(value) => setValue(value)}
                        value={value}
                        onValueChange={(value) => onValueChange(value)}
                    />
                </Command>
            </PopoverContent>

        </Popover>
    );
}
