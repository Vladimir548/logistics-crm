'use client'

import {QueryApplication} from "@/app/api/query/query-application";
import Table from "@/components/table/Table";
import {ColumnsApplication} from "@/columns/ColumnsApplication";
import TopLayouts from "@/app/layouts/TopLayouts";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";
import ApplicationContextMenu from "@/app/application/_ui/context-menu/ApplicationContextMenu";


export default function Application() {

const {getDataForContext,contextItem} = ApplicationContextMenu()

    const send = useReactQuerySubscription({query:'update-application', tracking:'application'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-all-application'})
    }, [send]);
    return (
        <div>
            <TopLayouts url={'application'}/>

            <Table queryKey={['get-all-application']} queryFn={(pageParam,search)=>QueryApplication.getAll({query:search,pageParam:pageParam})}  columns={ColumnsApplication} contextItem={contextItem} getDataForContext={getDataForContext}  />
        </div>
    );
};