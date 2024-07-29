
import {CommandItem, CommandList} from "@/components/command/Command";
import cn from "classnames";
import useVirtual from "@/hooks/useVirtual";
import {FaCheck} from "react-icons/fa";
import {ISelectItem} from "@/components/combobox/Combobox";
import Loading from "@/components/loading/Loading";

import * as ScrollArea from '@radix-ui/react-scroll-area';
interface IInfiniteVirtual {
    setOpen:(value:boolean)=>void
    setValue:(value:number)=>void
    value:number
    onValueChange?:(value:number)=>void
    items:ISelectItem[]
    dataCount:number
    fetchNextPage:()=>void;
    hasNextPage:boolean;
    isFetchingNextPage:boolean
    isFetching:boolean
}

export default function ComboboxList({isFetchingNextPage,hasNextPage,fetchNextPage,isFetching,items,dataCount,setOpen,setValue,value,onValueChange}: IInfiniteVirtual) {
    const {rowVirtualizer,parentRef}=useVirtual({rowsLength:items.length,totalCount:Number(dataCount),fetchNextPage:fetchNextPage,hasNextPage:hasNextPage,isFetchingNextPage:isFetchingNextPage});

    const handleSelect = (currentValue: ISelectItem) => {
        setValue(Number(currentValue.id));
        setOpen(false);
        if (onValueChange) {
            onValueChange(Number(currentValue.id));
        }
    };
    return (
<ScrollArea.Root>
        <ScrollArea.Viewport  style={{
            height: `200px`,
            width: `100%`,
            overflowY: 'auto',
        }} ref={parentRef}   >
                <CommandList className={'mr-4'} style={{
                    height: `${rowVirtualizer?.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}>

                    {rowVirtualizer?.getVirtualItems().map((virtualItem) => {
                        const listItem = items[virtualItem.index];
                        return (
                            <CommandItem style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualItem.size}px`,
                                transform: `translateY(${virtualItem.start}px)`,
                            }}
                                         className={'cursor-pointer p-2 mr-1 ease-linear duration-300 text-text hover:bg-border-dark'}
                                         key={virtualItem.index}
                                         value={listItem?.name}
                                         onSelect={() => handleSelect(listItem)}
                            >
                                {listItem?.name}
                                <FaCheck
                                    className={cn("ml-auto mr-[20px] h-4 w-4", value === listItem?.id ? "opacity-100" : "opacity-0")}/>
                            </CommandItem>
                        );
                    })}
                </CommandList>
                <div className={'flex justify-center items-center'}>
                    {isFetching && !isFetchingNextPage ? <Loading size={22}/> : null}
                </div>
            <div className="flex justify-center items-center">
                {items.length ===0  && <span className={'text-text flex justify-center   py-2 items-center text-base'}>Ничего не найдено</span>}
            </div>
        </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
        className="flex touch-none   rounded-md select-none  bg-text-dark  h-full w-[10px]  p-[1px] hover:w-[12px]"
        orientation="vertical"
    >
        <ScrollArea.Thumb className="relative flex-1 w-[15px] rounded-full bg-text" />
    </ScrollArea.Scrollbar>

</ScrollArea.Root>
    )

};