'use client';

import { ColumnsAccountNumber } from '@/columns/ColumnsAccountNumber';
import {QueryAccountNumber} from "@/app/api/query/query-account-number";
import Table from "@/components/table/Table";
import TopLayouts from "@/app/layouts/TopLayouts";
import AccountNumberContext from "@/app/account-number/_ui/context-menu/AccountNumberContext";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";

export default function AccountNumber() {
    const {contextItem,getDataForContext} = AccountNumberContext()
    const send = useReactQuerySubscription({query:'update-account', tracking:'account'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-all-account-number'})
    }, [send]);
    return (
        <div>
            <TopLayouts url={'account-number'}/>
            <Table   columns={ColumnsAccountNumber} queryFn={(pageParam,search)=>QueryAccountNumber.getAll({query:search,pageParam})} queryKey={['get-all-account-number']} contextItem={contextItem} getDataForContext={getDataForContext}   />
        </div>
    );
}
