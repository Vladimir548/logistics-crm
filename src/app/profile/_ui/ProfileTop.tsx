'use client'

import ProfileExit from "@/app/profile/_ui/ProfileExit";
import Link from "next/link";
import {getIdUser} from "@/services/auth/auth.helper";
import {useQuery} from "@tanstack/react-query";
import {QueryUser} from "@/app/api/query/query-user";
import {Button} from "@/components/buttons/Buttons";

export default function ProfileTop() {
    const id = getIdUser()
    const {data} = useQuery({
        queryKey: ['get-user-id', id],
        queryFn: () => QueryUser.getUserID(id)
    })

    return (
        <div
            className={`h-[60px] w-full flex px-2 ${data?.role === 'admin' ? 'justify-between' : 'justify-end'}  items-center bg-secondary-cust border-b border-text`}>
            {data?.role === 'admin' && (<Link href={'/profile/users'}>
                <Button>
                    Пользователи
                </Button>
            </Link>)}
            <div>
                <ProfileExit/>
            </div>
        </div>
    );
};