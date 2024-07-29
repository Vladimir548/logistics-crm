'use client'

import {getIdUser} from "@/services/auth/auth.helper";
import ProfileUserData from "@/app/profile/_ui/ProfileUserData";

export default function Profile() {
    const id =getIdUser()
    return (
        <div className={'w-full h-full overflow-hidden'}>
            <ProfileUserData id={Number(id)}/>
        </div>
    );
};