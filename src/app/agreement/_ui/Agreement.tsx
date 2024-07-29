
'use client'

import Table from "@/components/table/Table";
import {QueryAgreement} from "@/app/api/query/query-agreement";

import {ColumnsAgreement} from "@/columns/ColumnsAgreement";
import TopLayouts from "@/app/layouts/TopLayouts";
import AgreementContext from "@/app/agreement/_ui/context-menu/AgreementContext";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";

export default function Agreement() {
        const {getDataForContext,contextItem} = AgreementContext()
    const send = useReactQuerySubscription({query:'update-agreement', tracking:'agreement'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-all-agreement'})
    }, [send]);
    return (
        <div>
            <TopLayouts url={'agreement'}/>
            <Table queryFn={(page,search) => QueryAgreement.getAll({query:search,pageParam:page})} queryKey={['get-all-agreement']}  columns={ColumnsAgreement} getDataForContext={getDataForContext} contextItem={contextItem}/>
        </div>
    );
};