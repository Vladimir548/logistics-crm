import {useFilters} from "@/zustand/useFilters";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import FilterTrigger from "@/components/filters/FilterTrigger";
import RangePayment from "@/components/range/RangePayment";

export default function FilterDelta() {
    const getDeltaFrom = useFilters(state => state.getDeltaFrom)
    const getDeltaTo = useFilters(state => state.getDeltaTo)
    const deltaFrom = useFilters(state => state.deltaFrom)
    const deltaTo = useFilters(state => state.deltaTo)

    const searchParams = useSearchParams()
    useEffect(() => {
        const paymentFromParams = searchParams.get('paymentFrom')
        const paymentToParams = searchParams.get('paymentTo')
        if (paymentFromParams){
            getDeltaFrom(paymentFromParams)
        } if (paymentToParams){
            getDeltaTo(paymentToParams)
        }
    }, [searchParams]);
    return (
        <FilterTrigger title={"Дельта"} valueKey={'delta'}>
            <div className={'py-2 px-1'}>
                <RangePayment getFromValue={getDeltaFrom} getToValue={getDeltaTo} valueFrom={deltaFrom} valueTo={deltaTo}/>
            </div>
        </FilterTrigger>
    );
};