'use client'

import FilterTrigger from "@/components/filters/FilterTrigger";
import RangePayment from "@/components/range/RangePayment";
import {useFilters} from "@/zustand/useFilters";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";



export default function FilterPrepayment() {
    const getPrepaymentFrom = useFilters(state => state.getPrepaymentFrom)
    const getPrepaymentTo = useFilters(state => state.getPrepaymentTo)
    const prepaymentFrom = useFilters(state => state.prepaymentFrom)
    const prepaymentTo = useFilters(state => state.prepaymentTo)

    const searchParams = useSearchParams()
    useEffect(() => {
        const prepaymentFromParams = searchParams.get('prepaymentFrom')
        const prepaymentToParams = searchParams.get('prepaymentTo')
        if (prepaymentFromParams){
            getPrepaymentFrom(prepaymentFromParams)
        } if (prepaymentToParams){
            getPrepaymentTo(prepaymentToParams)
        }
    }, [searchParams]);
    return (
        <FilterTrigger title={"Сумма предоплаты"} valueKey={'prepayment-range'}>
            <div className={'py-2 px-1'}>
            <RangePayment getFromValue={getPrepaymentFrom} getToValue={getPrepaymentTo} valueTo={prepaymentTo} valueFrom={prepaymentFrom}/>
            </div>
        </FilterTrigger>
    );
};