'use client'

import {Input, InputProps} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {IoIosEyeOff, IoMdEye} from "react-icons/io";

export default function InputPassword(props:InputProps) {
    const [isVisible,setIsVisible] = useState(false)
    useEffect(()=>{
        if (isVisible){
            const timeout = setTimeout(()=> setIsVisible(false), 5000)
            return ()=> clearTimeout(timeout)
        }
    },[isVisible])
    return (
            <Input {...props}  variant={'bordered'} classNames={{
                input:" text-text ",
                inputWrapper:"rounded-md group-data-[focus=true]:border-border duration-300 ease-in-out border-border-dark data-[hover=true]:border-border",
                label:"text-text-dark group-data-[focus=true]:text-text group-data-[filled-within=true]:text-text"
            }} endContent={
                <button className={'text-text hover:text-text-dark duration-300 ease-in-out'} type={'button'} onClick={()=> setIsVisible(prev => !prev)}>
                {isVisible ? <IoIosEyeOff size={22} /> : <IoMdEye size={22} />}
                </button>
            } type={isVisible ? 'text' : 'password'}/>
    );
};