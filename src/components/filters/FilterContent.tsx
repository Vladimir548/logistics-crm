'use client'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/sheet/Sheet"

import {ImEqualizer2} from "react-icons/im";
import TooltipCustom from "@/components/tooltip/TooltipCustom";
import {ScrollArea} from "@/components/scroll-area/ScrollArea";
import FilterButtons from "@/components/filters/buttons/FilterButtons";
import {Button} from "@/components/buttons/Buttons";
import {IFilterObj} from "@/interface/interface-filter-obj";

export default function FilterContent({filter}: { filter: IFilterObj[] }) {
    return (
        <Sheet>
            <TooltipCustom label={"Фильтрация"}>
                <Button asChild size={'icon'}
                        className={' border  flex items-center justify-center  border-text-dark rounded-md text-text-dark hover:text-text hover:border-text'}>
                    <SheetTrigger>
                        <ImEqualizer2 size={21}/>
                    </SheetTrigger>
                </Button>
            </TooltipCustom>
            <SheetContent className={'bg-secondary-cust/50 backdrop-blur-md shadow-[0px_0px_7px_3px_#00cae9]'}>
                <SheetHeader>
                    <SheetTitle
                        className={'text-text w-full flex justify-center items-center py-1'}>Фильтрация</SheetTitle>
                </SheetHeader>
                <ScrollArea className={'overflow-y-auto h-full  pb-[80px] pr-3 pt-2 '}>
                    <ul className={'flex flex-col gap-y-2 pl-1'}>
                        {filter?.map((fil, i) => (
                            <li key={i}>
                                {fil.component}
                            </li>
                        ))}
                    </ul>
                    <FilterButtons/>
                </ScrollArea>
            </SheetContent>

        </Sheet>
    );
};