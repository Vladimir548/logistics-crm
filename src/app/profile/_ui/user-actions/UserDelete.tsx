
import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/auth/auth.service";
import {Button} from "@/components/buttons/Buttons";
import toast from "react-hot-toast";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function UserDelete({id} : {id: number}) {
    const send = useReactQuerySubscription({query:'update-user', tracking:'user'})
    const {mutate} = useMutation({
        mutationKey:['delete-user'],
        mutationFn:()=>authService.delete(id),
        onSuccess:()=>{
            toast.success('Пользователь удален')
            send({operation:'invalidate',entity:['get-all-users']})
        },
        onError:()=>{
            toast.error('Ошибка при удаление пользователя')
        }
    })

    return (
        <Button  onClick={()=>mutate()} variant={"delete"} radius={'sm'} size={"full"}>Удалить пользователя</Button>
    );
};