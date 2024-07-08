

import React, {useEffect, useState} from "react";
import { Button } from "@/components/buttons/Buttons"
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem, CommandList,
} from "@/components/command/Command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/popover/Popover"
import {FaCheck, FaSortDown} from "react-icons/fa";
import cn from "classnames";
import {ScrollArea} from "@/components/scroll-area/ScrollArea";

interface SelectOption {
    label: string;
    id: string;
}
interface SelectInputProps {
    options?: SelectOption[];
    onValueChange: (value: string) => void;
    values?: string;
    label?: string;
    isLoading?: boolean;
    disabled?: boolean;
}
export default function SelectInput({options, onValueChange,values,label,disabled}: SelectInputProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    useEffect(() => {
        if (values){
        setValue(String(values))
        }
        return
    }, [values]);
    console.log(value)
    const handleSelect = (currentValue: SelectOption) => {
        const newValue = currentValue.id === value ? "" : currentValue.id;
        setValue(newValue);
        onValueChange(newValue);
        setOpen(false);
    };
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger  disabled={disabled}  asChild>
                <Button
                    variant="default"
                    role="combobox"
                    aria-expanded={open}
                    className="min-w-[300px] w-full h-[56px] flex items-center justify-between hover:border-border"
                >
                    {disabled ? label : value  ?
                        <span className={'text-text'}>{options?.find((item) => item.id === value)?.label}</span> : label}
                    <span>  <FaSortDown
                        className={` flex ${value && 'text-text'}  justify-end ml-2 h-5 w-5 shrink-0 hover:text-text`} /></span>
                </Button>
            </PopoverTrigger>
            <PopoverContent  className="min-w-[300px] w-full p-1 z-50 backdrop-blur-2xl border border-border">
                <Command  className={'w-full'}>
                    <CommandInput  placeholder="Поиск..." className="h-9 "  />
                    <ScrollArea className={'max-h-[300px] py-1 '} >
                    <CommandList  >
                    <CommandEmpty className={'text-text text-sm text-center p-2'}>Ничего не найдено. Проверьте запрос</CommandEmpty>
                        {options?.map((item) => (
                            <CommandItem className={'cursor-pointer p-2 mr-1 ease-linear duration-300 text-text hover:bg-border-dark'}
                                key={item.id}
                                         value={item.label}
                                onSelect={()=>
                                    handleSelect(item)
                                }
                            >
                                {item.label}
                                <FaCheck
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === item?.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandList>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    );
};