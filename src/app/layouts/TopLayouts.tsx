'use client'

import Link from "next/link";
import {IoIosAdd} from "react-icons/io";
import Search from "@/components/search/Search";
import FilterContent from "@/components/filters/FilterContent";
import TooltipCustom from "@/components/tooltip/TooltipCustom";
import {Button} from "@/components/buttons/Buttons";

import {IFilterObj} from "@/interface/interface-filter-obj";

export default function TopLayouts({url, filter}: { url: string, filter?: IFilterObj[] }) {
    return (
        <div className={'flex flex-col border-b border-border pb-[60px]'}>
            <div
                className={'flex justify-between items-center absolute left-0 top-0 w-full h-[60px] bg-secondary-cust z-10 px-4 pb-2'}>
                <div className="">
                    <Search/>
                </div>
                <div className="flex gap-x-3">
                    <TooltipCustom duration={0} label={"Создать запись"}>
                        <Button variant={'no-style'}
                                className={'flex items-center  rounded-md border  border-green-500 ease-linear duration-300 hover:bg-green-500/50 hover:text-white'}
                                asChild size={"icon"}>
                            <Link href={`/${url}/create`}>
                                <span className={'font-bold'}><IoIosAdd size={24}/></span>
                            </Link>
                        </Button>
                    </TooltipCustom>
                    <div className={'h-full'}>
                        {filter &&
                            (
                                <FilterContent filter={filter}/>
                            )}
                    </div>
                </div>

            </div>
        </div>
    );
};