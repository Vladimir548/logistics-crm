import {useContextMenu} from "@/zustand/useContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useMutation} from "@tanstack/react-query";

import AlertDelete from "@/components/alert/AlertDelete";
import {QueryCostumer} from "@/app/api/query/QueryCostumer";
import {errorCatch} from "@/app/api/api.helper";
import toast from "react-hot-toast";

export default function CostumerDelete() {
    const { id } = useContextMenu();
    const send = useReactQuerySubscription({query:'update-costumer', tracking:'costumer'})
    const { mutate } = useMutation({
        mutationKey: ['delete-costumer'],
        mutationFn: () => QueryCostumer.delete(id),
        onSuccess: async () => {
            toast.success('Запись удалена');
            send({
                operation:'invalidate',
                entity:['get-all-costumer', 'costumer-get-all']
            })
        },
        onError: (error) => {
            const err = errorCatch(error);
            toast.error(err);
        },
    });

    const onDelete = ()=>{
        mutate()

    }
    return (
        <AlertDelete context={true} onDelete={onDelete}/>
    );
};