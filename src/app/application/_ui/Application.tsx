'use client'

import {QueryApplication} from "@/app/api/query/query-application";
import {useQuery} from "@tanstack/react-query";
import Table from "@/components/table/Table";
import {ColumnsApplication} from "@/columns/ColumnsApplication";
import TopLayouts from "@/app/layouts/TopLayouts";
import {IContextItem} from "@/app/(home)/_ui/Registry";
import ContextEditing from "@/components/context-menu/items/ContextEditing";
import {useContextMenu} from "@/zustand/useContextMenu";
import {Row} from "@tanstack/react-table";
import {IApplication} from "@/interface/interface-application";
import ContextChangeStatusApplication from "@/app/application/_ui/context-menu/ContextChangeStatusApplication";
import ApplicationDelete from "@/app/application/_ui/context-menu/ApplicationDelete";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";

export default function Application() {

    const {getNumberApplication,getStatusApplication,getId,id}=useContextMenu()
    const contextItem:IContextItem[] = [
        {
            component:<ContextChangeStatusApplication />
        },
        {
            component:<ContextEditing url={'/application'} id={id} />
        }, {
            component:<ApplicationDelete />
        },
    ]
    const getDataForContext = (row: Row<IApplication>) => {
        getId(row.original.id)
        getStatusApplication(row.original.status);
        getNumberApplication(row.original.applicationNumber);

    };
    const { data,isPending } = useQuery({
        queryKey: ['get-all-applications'],
        queryFn: () => QueryApplication.getAll(),

    });
    const send = useReactQuerySubscription({query:'update-applications', tracking:'up-application'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-all-applications'})
    }, [send]);
    return (
        <div>
            <TopLayouts url={'application'}/>

            <Table data={data} isLoading={isPending} columns={ColumnsApplication} contextItem={contextItem} getDataForContext={getDataForContext}  />
        </div>
    );
};