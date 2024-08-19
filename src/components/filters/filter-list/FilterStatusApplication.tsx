import FilterTrigger from "@/components/filters/FilterTrigger";
import StatusOrderList from "@/components/status-order/StatusOrderList";
import {useFilters} from "@/zustand/useFilters";

import useInitUrl from "@/zustand/useInitUrl";

import {StatusOrder} from "@/interface/interface-registry";

export default function FilterStatusApplication() {
    const value = useFilters(state => state.statusApplication)
    const setValue = useFilters(state => state.getStatusApplication)

    useInitUrl('statusApplication',setValue,value)
    return (
        <FilterTrigger  title={'Статус заявки'} valueKey={'status-application'}>
         <div className="px-1 pb-1">
            <StatusOrderList idForLabel={'application'} values={value} getValue={(val:StatusOrder)=>setValue(val)}/>
         </div>
        </FilterTrigger>
    );
};