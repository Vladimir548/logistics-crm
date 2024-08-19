'use client'

import useFilterQuery from "@/hooks/useFilterQuery";
import {useRouter} from "next/navigation";
import ApplyFilter from "@/components/filters/buttons/ApplyFilter";
import ClearFilter from "@/components/filters/buttons/ClearFilter";


export default function FilterButtons() {
    const {getQueryString,clearQuery} = useFilterQuery();
    const { push } = useRouter();

    const handleSearch = () => {
        const queryString = getQueryString();
        push(`?${queryString}`);
    };
    const clearParams = ()=>{
       const clear = clearQuery();
       push(`?${clear}`);

    }
    return (
        <div className={'absolute left-0 bottom-0 pb-2 w-full z-10 bg-secondary-cust rounded-t-md px-1 h-[50px] flex justify-between items-center mb-[28px]'}>
            <ApplyFilter filterFn={handleSearch} />
            <ClearFilter clearFn={clearParams} />
        </div>
    );
};