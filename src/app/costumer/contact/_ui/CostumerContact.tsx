'use client';

import { ColumnsCostumerContact } from '@/columns/ColumnsCostumerContact';
import {QueryContactCostumer} from "@/app/api/query/query-contact-costumer";
import Table from "@/components/table/Table";
import TopLayouts from "@/app/layouts/TopLayouts";
import CostumerContactContextMenu from "@/app/costumer/contact/_ui/context-menu/CostumerContactContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";

export default function CostumerContact() {
    const {getDataForContext,contextItem} = CostumerContactContextMenu()
    const send = useReactQuerySubscription({query:'update-contact-costumer', tracking:'contact-costumer'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-all-costumer-contact'})
    }, [send]);
  return (
    <div>
      <TopLayouts url={'costumer/contact'}/>
            <Table queryFn={(page,search)=>QueryContactCostumer.getAll({query:search,offset:page})} queryKey={['get-all-costumer-contact']} columns={ColumnsCostumerContact} contextItem={contextItem} getDataForContext={getDataForContext} />

    </div>
  );
}
