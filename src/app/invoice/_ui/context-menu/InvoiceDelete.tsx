import {useContextMenu} from "@/zustand/useContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import AlertDelete from "@/components/alert/AlertDelete";

import {QueryInvoice} from "@/app/api/query/query-invoice";

export default function InvoiceDelete() {
    const { id } = useContextMenu();
    const send = useReactQuerySubscription({query:'update-invoice', tracking:'invoice'})
    const { mutate } = useMutation({
        mutationKey: ['delete-invoice'],
        mutationFn: () => QueryInvoice.delete(id),
        onSuccess: async () => {
            toast.success('Запись удалена');
            send({operation:'invalidate',entity:['get-all-application','get-all-registry','get-all-invoice']})
        },
        onError: () => {
            toast.error('Ошибка при удалении записи');
        },
    });

    const onDelete = ()=>{
        mutate()

    }
    return (
       <AlertDelete context={true} onDelete={onDelete}/>
    );
};