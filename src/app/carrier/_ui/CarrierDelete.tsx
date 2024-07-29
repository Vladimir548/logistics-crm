import {useContextMenu} from "@/zustand/useContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useMutation} from "@tanstack/react-query";
import AlertDelete from "@/components/alert/AlertDelete";
import {errorCatch} from "@/app/api/api.helper";
import toast from "react-hot-toast";
import {QueryCarrier} from "@/app/api/query/query-carrier";

export default function CarrierDelete() {
    const { id } = useContextMenu();
    const send = useReactQuerySubscription({query:'update-carrier', tracking:'carrier'})
    const { mutate } = useMutation({
        mutationKey: ['delete-carrier'],
        mutationFn: () => QueryCarrier.delete(id),
        onSuccess: async () => {
            toast.success('Запись удалена');
            send({operation:'invalidate',entity:['get-all-carrier']})
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