'use client'

import {getIdUser} from "@/services/auth/auth.helper";
import ProfileUserData from "@/app/profile/_ui/ProfileUserData";
import ProfileTop from "@/app/profile/_ui/ProfileTop";

export default function Profile() {
    const id =getIdUser()
    return (
        <div className={'w-full h-full overflow-hidden'}>
            <ProfileTop/>
            <ProfileUserData id={Number(id)}/>
        </div>
    );
};