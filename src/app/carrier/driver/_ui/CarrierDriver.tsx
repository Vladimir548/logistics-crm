'use client'
import {QueryDriver} from "@/app/api/query/QueryDriver";
import Table from "@/components/table/Table";
import {ColumnsCarrierDriver} from "@/columns/ColumnsCarrierDriver";
import TopLayouts from "@/app/layouts/TopLayouts";
import CarrierDriverContextMenu from "@/app/carrier/driver/_ui/context-menu/CarrierDriverContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";

export default function CarrierDriver() {
    const {getDataForContext,contextItem} = CarrierDriverContextMenu()
    const send = useReactQuerySubscription({query:'update-driver', tracking:'driver'})
    useEffect(() => {
        send({operation:'invalidate',entity:['get-all-driver']})
    }, [send]);
    return (
        <div>
            <TopLayouts url={'carrier/driver'}/>
            <Table queryFn={(page,search)=>QueryDriver.getAll({query:search,offset:page})} queryKey={['get-all-driver']}  contextItem={contextItem} getDataForContext={getDataForContext} columns={ColumnsCarrierDriver} />
        </div>
    );
};