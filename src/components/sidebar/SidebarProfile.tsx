'use client'

import {useQuery} from "@tanstack/react-query";
import {QueryUser} from "@/app/api/query/query-user";
import {getIdUser} from "@/services/auth/auth.helper";
import Link from "next/link";
import {ROLE} from "@/data/data-roles";

export default function SidebarProfile() {
    const id = getIdUser()
    const {data} = useQuery({
        queryKey: ['get-user-id'],
        queryFn: () => QueryUser.getUserID(id),
        enabled: !!id
    })
    const initialsUser = data?.fio.split(' ')
    return (
        <Link href={'/profile'} className={'bg-[#1e373e] rounded-md text-text flex justify-center items-center gap-x-1 px-1 mx-0.5 duration-300 ease-linear hover:bg-[#23444d]'}>
            <div className={'w-[60px] h-[50px] rounded-full bg-table-body flex justify-center'}>
                <span
                    className={'flex justify-center items-center'}>{initialsUser?.map(element => element.charAt(0))}</span>
            </div>
            <div className={'flex flex-col'}>
                <p className={'text-sm'}>{data?.fio}</p>
                <div className={'flex justify-between items-center gap-x-1 text-text-dark'}>
                    <span className={'text-sm line-clamp-1'}>{data?.login}</span>
                    <span className={'text-[12px]'}>{ROLE.find(role => role.value === data?.role)?.label}</span>
                </div>
            </div>
        </Link>
    );
};