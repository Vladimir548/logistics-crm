import FilterTrigger from "@/components/filters/FilterTrigger";
import {DatePickerWithRange} from "@/components/date-range/DateRange";
import {useFilters} from "@/zustand/useFilters";


export default function FilterDate() {

    const setDateFrom= useFilters(state => state.getPeriodFrom)
    const setDateTo= useFilters(state => state.getPeriodTo)


    return (
        <FilterTrigger title={'Период'} valueKey={'date'}>
                   <DatePickerWithRange/>
        </FilterTrigger>
    );
};