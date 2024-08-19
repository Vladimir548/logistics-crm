import FilterTrigger from "@/components/filters/FilterTrigger";
import StatusOrderList from "@/components/status-order/StatusOrderList";
import {useFilters} from "@/zustand/useFilters";
import useInitUrl from "@/zustand/useInitUrl";
import {StatusOrder} from "@/interface/interface-registry";

export default function FilterStatusAgreement() {

    const value = useFilters(state => state.statusAgreement)
    const setValue = useFilters(state => state.getStatusAgreement)
    useInitUrl('statusAgreement',setValue,value)
    return (
        <FilterTrigger  title={'Статус договора'} valueKey={'status-agreement'}>
         <div className="px-1 pb-1">
            <StatusOrderList idForLabel={'agreement'} values={value} getValue={(val:StatusOrder)=>setValue(val)}/>
         </div>
        </FilterTrigger>
    );
};