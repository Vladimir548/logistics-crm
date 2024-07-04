'use client'

import {Input, InputProps} from "@nextui-org/react";


export default function InputCustom(props:InputProps) {
    return (
            <Input {...props} variant={'bordered'}  classNames={{
                input:" text-text ",
                inputWrapper:"rounded-md group-data-[focus=true]:border-border duration-300 ease-in-out border-border-dark data-[hover=true]:border-border ",
                label:"text-text-dark group-data-[focus=true]:text-text group-data-[filled-within=true]:text-text"
            }}  />
    );
};