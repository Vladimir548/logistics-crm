import {useContextMenu} from "@/zustand/useContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useMutation} from "@tanstack/react-query";
import AlertDelete from "@/components/alert/AlertDelete";
import {errorCatch} from "@/app/api/api.helper";
import toast from "react-hot-toast";
import {QueryDriver} from "@/app/api/query/QueryDriver";

export default function CarrierDriverDelete() {
    const { id } = useContextMenu();
    const send = useReactQuerySubscription({query:'update-driver', tracking:'driver'})
    const { mutate } = useMutation({
        mutationKey: ['delete-driver-contact'],
        mutationFn: () => QueryDriver.delete(id),
        onSuccess: async () => {
            toast.success('Запись удалена');
            send({operation:'invalidate',entity:['get-all-driver']})
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