'use client';


import {Select, SelectContent,  SelectTrigger, SelectValue} from "@/components/select/Select";

import {SelectIcon, SelectProps} from "@radix-ui/react-select";
import {FaSort, } from "react-icons/fa";
import {CgSpinner} from "react-icons/cg";
import cn from "classnames";

interface ISelect  {
    label: string,
    isLoading?:boolean
    className?: string,
}

export default function SelectCustom({ label,isLoading,className,...props }:ISelect & SelectProps) {
    return (
        <>
        {!isLoading ? (
        <Select   {...props} >
            <SelectTrigger   className={className} >
                <p>{label}</p>
                <SelectValue />
                <SelectIcon asChild>
                    <FaSort className={'self-center text-text-dark focus:text-text'} />
                </SelectIcon>
            </SelectTrigger>
            <SelectContent>
                {props.children}
            </SelectContent>
        </Select>
            ) : (
                <Select>
                    <SelectTrigger  disabled={true}  className={cn('disabled:opacity-90',className)} >
                            <p >Загрузка...</p>
                        <SelectValue />
                        <SelectIcon asChild>
                            <CgSpinner    className={'animate-spin self-center text-text-dark focus:text-text'} size={20} />
                        </SelectIcon>
                    </SelectTrigger>

                </Select>
            )}
        </>
        // <Select  autoFocus={true}  {...props}  classNames={{
        //     base:"bg-secondary-cust  ",
        //     trigger:'border-border-dark rounded-md data-[focus=true]:border-border data-[hover=true]:border-border data-[open=true]:border-border',
        //     label:"text-text-dark group-data-[focus=true]:text-text data-[open=true]:text-text group-data-[filled=true]:text-text",
        //     selectorIcon:'text-text',
        //     listboxWrapper:'bg-[#072731] ]  text-text data-[hover=true]:bg-border-dark border border-[#04c0ff] rounded-md ',
        //     listbox:style.item_list,
        //     popoverContent:'bg-transparent data-[hover=true]:bg-border-dark  ',
        //
        //     value:'text-text',
        // }}
        //     variant={'bordered'}
        //     className="min-w-[200px] w-[inherit]"
        // />


    );
}