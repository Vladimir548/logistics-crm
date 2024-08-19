'use client'

import FilterTrigger from "@/components/filters/FilterTrigger";
import {QueryCarrier} from "@/app/api/query/query-carrier";
import ComboboxFilters from "@/components/combobox/ComboboxFilters";
import {useFilters} from "@/zustand/useFilters";

import useInitUrl from "@/zustand/useInitUrl";

export default function FilterCarrier() {
    const value = useFilters(state => state.carriers)
    const setValue = useFilters(state => state.getCarrier)
    useInitUrl('carriers', setValue, value);
    return (
        <FilterTrigger title={'Перевозчик'} valueKey={'carrier'}>
            <ComboboxFilters value={value} setValue={(value:number)=>setValue(value)}
                      queryKey={['get-all-carrier']}
                      queryFn={(pageParam, search)=>QueryCarrier.getAll({offset:pageParam,query:search})} nameField={'name'} />
        </FilterTrigger>
    );
};