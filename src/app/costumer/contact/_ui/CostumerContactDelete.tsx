import {useContextMenu} from "@/zustand/useContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useMutation} from "@tanstack/react-query";
import AlertDelete from "@/components/alert/AlertDelete";
import {errorCatch} from "@/app/api/api.helper";
import toast from "react-hot-toast";
import {QueryContactCostumer} from "@/app/api/query/query-contact-costumer";

export default function CostumerContactDelete() {
    const { id } = useContextMenu();
    const send = useReactQuerySubscription({query:'update-contact-costumer', tracking:'contact-costumer'})
    const { mutate } = useMutation({
        mutationKey: ['delete-costumer-contact'],
        mutationFn: () => QueryContactCostumer.delete(id),
        onSuccess: async () => {
            toast.success('Запись удалена');
            send({operation:'invalidate',entity:['get-all-costumer-contact','get-costumer-id-contact']})
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