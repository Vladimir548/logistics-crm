import {useContextMenu} from "@/zustand/useContextMenu";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import AlertDelete from "@/components/alert/AlertDelete";
import {QueryAgreement} from "@/app/api/query/query-agreement";

export default function AgreementDelete() {
    const { id } = useContextMenu();
    const send = useReactQuerySubscription({query:'update-agreement', tracking:'agreement'})
    const { mutate } = useMutation({
        mutationKey: ['delete-application'],
        mutationFn: () => QueryAgreement.delete(id),
        onSuccess: async () => {
            toast.success('Запись удалена');
            send({
                operation:'invalidate',
                entity:['get-all-agreement','get-all-registry','get-all-invoice'],
            })
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