'use client'

import FilterTrigger from "@/components/filters/FilterTrigger";
import RangePayment from "@/components/range/RangePayment";
import {useFilters} from "@/zustand/useFilters";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";



export default function FilterPayment() {
    const getPaymentFrom = useFilters(state => state.getPaymentFrom)
    const getPaymentTo = useFilters(state => state.getPaymentTo)
    const paymentFrom = useFilters(state => state.paymentFrom)
    const paymentTo = useFilters(state => state.paymentTo)

    const searchParams = useSearchParams()
    useEffect(() => {
        const paymentFromParams = searchParams.get('paymentFrom')
        const paymentToParams = searchParams.get('paymentTo')
        if (paymentFromParams){
            getPaymentFrom(paymentFromParams)
        } if (paymentToParams){
            getPaymentTo(paymentToParams)
        }
    }, [searchParams]);
    return (
        <FilterTrigger title={"Сумма оплаты"} valueKey={'payment-range'}>
            <div className={'py-2 px-1'}>
            <RangePayment getFromValue={getPaymentFrom} getToValue={getPaymentTo} valueFrom={paymentFrom} valueTo={paymentTo}/>
            </div>
        </FilterTrigger>
    );
};