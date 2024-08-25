'use client'

import {useQuery} from "@tanstack/react-query";
import {authService} from "@/services/auth/auth.service";
import {ROLE} from "@/data/data-roles";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/popover/Popover";
import ProfileUserActions from "@/app/profile/_ui/user-actions/ProfileUserActions";

import ProfileCreateUser from "@/app/profile/_ui/ProfileCreateUser";
import {IndicatorUser} from "@/styles/status-user-styles";

export default function ProfileUsers() {
    const {data} = useQuery({
        queryKey: ['get-all-users'],
        queryFn: () => authService.users()
    })
    return (
        <div className={'flex flex-col'}>
            <div className={'my-2'}>
                <ProfileCreateUser/>
            </div>
            <div className={'flex p-2 gap-3 flex-wrap '}>
                {data?.map(user => (
                    <Popover key={user.id}>
                        <PopoverTrigger asChild>
                            <div
                                className={'shadow-[0px_0px_5px_1px] cursor-pointer relative  shadow-border-dark rounded-sm flex w-[400px] ease-in-out duration-300 flex-col p-2 hover:shadow-[inset_0px_0px_5px_1px] hover:shadow-border-dark'}
                            >
                                <p className={'text-text'}>{user.fio}</p>
                                <div className={'flex  justify-between items-center text-text-dark'}>
                                    <span>{user.login}</span>
                                    <span>{ROLE.find(role => role.value === user?.role)?.label}</span>
                                </div>
                                <h3 className={'text-text'}>Статистика:</h3>
                                <div className={'flex justify-between items-center'}>
                                    <div className={'flex flex-col'}>
                                        <h4 className={'text-text'}>Заявка</h4>
                                        <span className={'text-text-dark text-center'}>
                                            {user.application?.length}
                                                </span>
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <h4 className={'text-text'}>Договор</h4>
                                        <span className={'text-text-dark text-center'}>
                                            {user?.agreement?.length}
                                            </span>
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <h4 className={'text-text'}>УПД</h4>
                                        <span className={'text-text-dark text-center'}>
                                            {user?.Invoice?.length}
                                            </span>
                                    </div>
                                </div>
                                <IndicatorUser variant={user.status}></IndicatorUser>

                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] border-2 border-border p-2  bg-secondary-cust">
                            <ProfileUserActions id={Number(user.id)}/>
                        </PopoverContent>
                    </Popover>
                ))}
            </div>
        </div>
    );
};