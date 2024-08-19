import FilterTrigger from "@/components/filters/FilterTrigger";
import ComboboxFilters from "@/components/combobox/ComboboxFilters";
import {QueryCostumer} from "@/app/api/query/QueryCostumer";
import {useFilters} from "@/zustand/useFilters";
import useInitUrl from "@/zustand/useInitUrl";

export default function FilterCostumer() {
    const value = useFilters(state => state.costumers)
    const setValue = useFilters(state => state.getCostumers)
    useInitUrl('costumers', setValue, value);
    return (
        <FilterTrigger title={'Заказчик'} valueKey={'costumer'}>
            <ComboboxFilters value={value} setValue={(value:number)=>setValue(value)}
                             queryKey={['get-all-costumer']}
                             queryFn={(pageParam, search)=>QueryCostumer.getAll({page:pageParam,query:search})} nameField={'name'} />
        </FilterTrigger>
    );
};