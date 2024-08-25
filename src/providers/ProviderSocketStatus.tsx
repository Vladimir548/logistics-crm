'use client'

import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import React, {useEffect} from "react";


export default function ProviderSocketStatus({ children }: React.PropsWithChildren) {

    const send = useReactQuerySubscription({query: 'update-user', tracking: 'user-status'})
    useEffect(() => {
        send({operation: 'invalidate', entity: 'get-all-users'})
    }, [send]);
    return (
        <div>
            {children}
        </div>
    );
};