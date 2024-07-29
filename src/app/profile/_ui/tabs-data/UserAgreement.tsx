
import Table from "@/components/table/Table";
import React, {useEffect} from "react";
import {QueryAgreement} from "@/app/api/query/query-agreement";
import {ColumnsAgreement} from "@/columns/ColumnsAgreement";
import AgreementContext from "@/app/agreement/_ui/context-menu/AgreementContext";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function UserAgreement({id}: {id: number}) {
    const {getDataForContext,contextItem} = AgreementContext()
    const send = useReactQuerySubscription({query:'update-agreement', tracking:'agreement'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-all-agreement'})
    }, [send]);
    return (

            <Table queryFn={(page) => QueryAgreement.user({pageParam:page,id:id})} queryKey={['get-all-agreement']}  columns={ColumnsAgreement} getDataForContext={getDataForContext} contextItem={contextItem} />

    );
};