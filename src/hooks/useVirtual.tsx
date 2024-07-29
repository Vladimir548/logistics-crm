import {useEffect, useRef} from "react";
import {useVirtualizer} from "@tanstack/react-virtual";

interface IUseVirtual {
    rowsLength:number
    totalCount:number
    hasNextPage:boolean
    isFetchingNextPage:boolean
    fetchNextPage:()=>void
}


export default function useVirtual({totalCount,isFetchingNextPage,hasNextPage,fetchNextPage,rowsLength}:IUseVirtual) {
    const parentRef = useRef(null);
    const rowVirtualizer = useVirtualizer({
        count: rowsLength  ,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 50,
        overscan: 10,
    });
    useEffect(() => {

            const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
            if (!lastItem) {
                return;
            }
            if (
                lastItem.index >= rowsLength - 1 &&
                hasNextPage &&
                !isFetchingNextPage &&
                rowsLength !== totalCount
            ) {
                fetchNextPage();
            }

    }, [hasNextPage, fetchNextPage, rowsLength, isFetchingNextPage, rowVirtualizer.getVirtualItems()])

    return {parentRef, rowVirtualizer}
};