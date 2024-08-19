import {IFilterObj} from "@/interface/interface-filter-obj";
import FilterCarrier from "@/components/filters/filter-list/FilterCarrier";
import FilterCostumer from "@/components/filters/filter-list/FilterCostumer";
import FilterDate from "@/components/filters/filter-list/FilterDate";
import FilterPayment from "@/components/filters/filter-list/FilterPayment";
import FilterPrepayment from "@/components/filters/filter-list/FilterPrepayment";
import FilterDelta from "@/components/filters/filter-list/FilterDelta";
import FilterStatusAgreement from "@/components/filters/filter-list/FilterStatusAgreement";
import FilterStatusApplication from "@/components/filters/filter-list/FilterStatusApplication";

export default function RegistryFilterObj() {
    const filterRegistry:IFilterObj[] = [
        {
          component:<FilterCarrier/>
        },  {
          component:<FilterCostumer/>
        },  {
          component:<FilterDate/>
        },  {
          component:<FilterPayment/>
        },  {
          component:<FilterPrepayment/>
        },{
          component:<FilterDelta/>
        },{
          component:<FilterStatusAgreement/>
        },{
          component:<FilterStatusApplication/>
        },
    ]
    return filterRegistry
};