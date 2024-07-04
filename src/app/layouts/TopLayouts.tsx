'use client'

import Link from "next/link";
import {IoIosAdd} from "react-icons/io";
import Search from "@/components/search/Search";

export default function TopLayouts({url}:{url:string}) {
    return (
        <div className={'flex flex-col border-b border-border pb-[60px]' }>
            <div className={'flex justify-between items-center absolute left-0 top-0 w-full h-[60px] bg-secondary-cust z-10 px-4 pb-2'}>
                <div className="">
                    <Search/>
                </div>
                <div className="">
                    <Link className={'flex items-center p-1 rounded-md border  border-green-500 ease-linear duration-300 hover:bg-green-500/50 hover:text-white'} href={`/${url}/create`}>
                     <span className={'font-bold'}><IoIosAdd size={24} /></span>
                        <span>Создать запись</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};