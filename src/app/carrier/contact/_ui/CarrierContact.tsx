'use client'
import {QueryContactCarrier} from "@/app/api/query/query-contact-carrier";
import Table from "@/components/table/Table";
import {ColumnsCarrierContact} from "@/columns/ColumnsCarrierContact";
import TopLayouts from "@/app/layouts/TopLayouts";
import CarrierContactContextMenu from "@/app/carrier/contact/_ui/context-menu/CarrierContactContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";

export default function CarrierContact() {
    const {getDataForContext,contextItem} = CarrierContactContextMenu()
    const send = useReactQuerySubscription({query:'update-carrier-contact', tracking:'carrier-contact'})
    useEffect(() => {
        send({operation:'invalidate',entity:['get-all-carrier-contact']})
    }, [send]);
    return (
        <div>
            <TopLayouts url={'carrier/contact'}/>
            <Table queryFn={(page,search)=>QueryContactCarrier.getAll({query:search,offset:page})} queryKey={['get-all-carrier-contact']}  contextItem={contextItem} getDataForContext={getDataForContext} columns={ColumnsCarrierContact} />
        </div>
    );
};