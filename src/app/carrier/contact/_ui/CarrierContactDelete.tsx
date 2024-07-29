import {useContextMenu} from "@/zustand/useContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useMutation} from "@tanstack/react-query";
import AlertDelete from "@/components/alert/AlertDelete";
import {errorCatch} from "@/app/api/api.helper";
import toast from "react-hot-toast";
import {QueryContactCarrier} from "@/app/api/query/query-contact-carrier";

export default function CarrierContactDelete() {
    const { id } = useContextMenu();
    const send = useReactQuerySubscription({query:'update-carrier-contact', tracking:'carrier-contact'})
    const { mutate } = useMutation({
        mutationKey: ['delete-carrier-contact'],
        mutationFn: () => QueryContactCarrier.delete(id),
        onSuccess: async () => {
            toast.success('Запись удалена');
            send({operation:'invalidate',entity:['get-all-carrier-contact']})
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