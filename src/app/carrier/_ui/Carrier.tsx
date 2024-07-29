'use client'
import {QueryCarrier} from "@/app/api/query/query-carrier";
import Table from "@/components/table/Table";
import {ColumnsCarrier} from "@/columns/ColumnsCarrier";
import TopLayouts from "@/app/layouts/TopLayouts";
import CarrierContextMenu from "@/app/carrier/_ui/context-menu/CarrierContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";

export default function Carrier() {
    const {getDataForContext,contextItem} = CarrierContextMenu()
    const send = useReactQuerySubscription({query:'update-carrier', tracking:'carrier'})
    useEffect(() => {
        send({operation:'invalidate',entity:['get-all-carrier']})
    }, [send]);
    return (
        <div>
            <TopLayouts url={'carrier'}/>
            <Table queryFn={(page,search) => QueryCarrier.getAll({query:search,offset:page})} queryKey={['get-all-carrier']} columns={ColumnsCarrier}
            getDataForContext={getDataForContext}  contextItem={contextItem}/>
        </div>
    );
};