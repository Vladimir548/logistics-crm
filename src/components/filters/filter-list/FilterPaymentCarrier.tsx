import {useFilters} from "@/zustand/useFilters";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import FilterTrigger from "@/components/filters/FilterTrigger";
import RangePayment from "@/components/range/RangePayment";

export default function FilterPaymentCarrier() {
    const getPaymentFromCarrier = useFilters(state => state.getPaymentFromCarrier)
    const getPaymentToCarrier = useFilters(state => state.getPaymentToCarrier)
    const paymentFromCarrier = useFilters(state => state.paymentFromCarrier)
    const paymentToCarrier = useFilters(state => state.paymentToCarrier)

    const searchParams = useSearchParams()
    useEffect(() => {
        const paymentFromParams = searchParams.get('paymentFromCarrier')
        const paymentToParams = searchParams.get('paymentToCarrier')
        if (paymentFromParams){
            getPaymentFromCarrier(paymentFromParams)
        } if (paymentToParams){
            getPaymentToCarrier(paymentToParams)
        }
    }, [searchParams]);
    return (
        <FilterTrigger title={"Сумма оплаты перевозчику"} valueKey={'payment-range-carrier'}>
            <div className={'py-2 px-1'}>
                <RangePayment getFromValue={getPaymentFromCarrier} getToValue={getPaymentToCarrier} valueFrom={paymentFromCarrier} valueTo={paymentToCarrier}/>
            </div>
        </FilterTrigger>
    );
};