import {useFilters} from "@/zustand/useFilters";
import {useEffect, useState} from "react";
import {IFilterResponse} from "@/interface/interface-filter";
import {useSearchParams} from "next/navigation";

export default function useEffectUrl() {
    const {periodFrom,periodTo,paymentFrom,paymentTo,carriers,costumers,statusAgreement,
        statusApplication,prepaymentFrom,prepaymentTo,paymentToCarrier,paymentFromCarrier,deltaFrom,deltaTo} = useFilters()
    const [filters,setFilters] = useState<Partial<IFilterResponse>>();
    const searchParams = useSearchParams();
    useEffect(() => {
        const filtersData:Partial<IFilterResponse> ={
            periodTo,
            periodFrom,
            paymentTo,paymentFrom,carriers,costumers,statusAgreement,statusApplication,prepaymentFrom,prepaymentTo,paymentFromCarrier,paymentToCarrier,deltaFrom,deltaTo
        }
       const clearFilter:Partial<IFilterResponse> = Object.entries(filtersData).reduce((acc,[key,value]) => {
           if (value !== null && value !== '' && value !== undefined && value.length > 0){
                acc[key] = value
           }
           return acc
       },{} as Partial<IFilterResponse>)
        setFilters(clearFilter)
    }, [searchParams]);
    return filters
};