'use client'
import {QueryCostumer} from "@/app/api/query/QueryCostumer";
import Table from "@/components/table/Table";
import {ColumnsCostumer} from "@/columns/ColumnsCostumer";
import TopLayouts from "@/app/layouts/TopLayouts";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";
import CostumerContextMenu from "@/app/costumer/_ui/context-menu/CostumerContextMenu";
export default function Costumer() {
    const {getDataForContext,contextItem} = CostumerContextMenu()
    const send = useReactQuerySubscription({query:'update-costumer', tracking:'costumer'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-all-costumer'})
    }, [send]);
    return (
        <div>
            <TopLayouts url={'costumer'}/>
            <Table queryKey={['get-all-costumer']} queryFn={(page,search)=>QueryCostumer.getAll({query:search,page:page})} columns={ColumnsCostumer} contextItem={contextItem} getDataForContext={getDataForContext} />

        </div>
    );
};