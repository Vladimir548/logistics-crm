'use client'

import {useQuery} from "@tanstack/react-query";
import {QueryUser} from "@/app/api/query/query-user";
import {getIdUser} from "@/services/auth/auth.helper";
import Link from "next/link";
import {ROLE} from "@/data/data-roles";
import Loading from "@/components/loading/Loading";


export default function SidebarProfile() {
    const id = getIdUser()
    const {data,isPending} = useQuery({
        queryKey: ['get-user-id'],
        queryFn: () => QueryUser.getUserID(id),
        enabled: !!id
    })
    return (

        <Link href={'/profile'} className={'bg-[#1e373e] h-[60px] rounded-t-md w-full text-text flex justify-center items-center gap-x-1 px-1  duration-300 ease-linear hover:bg-[#23444d]'}>
            {!isPending ? (
                <>

            <div className={'flex flex-col'}>
                <p className={'text-sm'}> {data?.fio}</p>
                <div className={'flex justify-between items-center gap-x-1 text-text-dark'}>
                    <span className={'text-sm line-clamp-1'}>{data?.login}</span>
                    <span className={'text-[12px]'}>{ROLE.find(role => role.value === data?.role)?.label}</span>
                </div>
            </div>
                </>
                ) : (
                <div className={'flex justify-center items-center h-[60px]'}>
                    <Loading size={28}/>

                </div>
                )}
        </Link>
    );
};