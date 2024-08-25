'use client'

import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/auth/auth.service";
import toast from "react-hot-toast";
import {IoMdExit} from "react-icons/io";
import {Button} from "@/components/buttons/Buttons";
import {useRouter} from "next/navigation";

export default function ProfileExit() {
    const {replace} = useRouter()
    const {mutate} = useMutation({
        mutationKey:['exit-from-profile'],
        mutationFn:()=>authService.logout(),
        onSuccess:()=>{
            replace('/login')
            toast.success('Вы вышли из профиля')

        },
        onError:()=>{
            toast.error('Ошибка выхода')
        }
    })
    return (
        <div>
            <Button onClick={()=>mutate()} variant={'delete'} size={"no-style"} className={'px-3 py-2'} radius={"sm"} ><IoMdExit size={18} /> Выход</Button>
        </div>
    );
};