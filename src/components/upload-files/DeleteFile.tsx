import {useMutation} from "@tanstack/react-query";
import {QueryFiles} from "@/app/api/query/query-files";

import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import toast from "react-hot-toast";
import AlertDelete from "@/components/alert/AlertDelete";

export default function DeleteFile({id}: {id: number }) {
    const send = useReactQuerySubscription({query:'update-document', tracking:'document'})
    const {mutate} = useMutation({
        mutationKey:['delete-file'],
        mutationFn:()=>QueryFiles.deleteFilesRegistry(id),
        onSuccess:()=>{
            toast.success('Файл удален');
            send({operation:'invalidate',entity:'get-files',id:id})
    },onError: () => {
            toast.error('Ошибка при удалении файла');
        },
    })
    const onDelete = ()=>{
        mutate()

    }
    return (
        <AlertDelete  context={true} onDelete={onDelete} text={false}/>
    );
};