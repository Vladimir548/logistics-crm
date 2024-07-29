
'use client'

import {QueryApplication} from "@/app/api/query/query-application";

import React, {useEffect} from "react";
import Table from "@/components/table/Table";
import {ColumnsApplication} from "@/columns/ColumnsApplication";
import ApplicationContextMenu from "@/app/application/_ui/context-menu/ApplicationContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function UserApplication({id}: {id: number}) {
    const {getDataForContext,contextItem} = ApplicationContextMenu()
    const send = useReactQuerySubscription({query:'update-application', tracking:'application'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-all-application'})
    }, [send]);
    return (
        <div>
           <Table queryKey={['get-all-application']} queryFn={(pageParam)=>QueryApplication.user({id:id,pageParam:pageParam})}  columns={ColumnsApplication} contextItem={contextItem} getDataForContext={getDataForContext} />

        </div>
    );
};