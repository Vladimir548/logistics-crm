
'use client'

import ProfileExit from "@/app/profile/_ui/ProfileExit";

export default function ProfileTop() {

    return (
        <div className={'h-[60px] w-full flex justify-end items-center bg-secondary-cust border-b border-text'}>
            <div>
            <ProfileExit/>
            </div>
        </div>
    );
};