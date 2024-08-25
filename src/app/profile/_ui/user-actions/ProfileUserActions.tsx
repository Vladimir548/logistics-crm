'use client'



import UserDelete from "@/app/profile/_ui/user-actions/UserDelete";
import UserEditing from "@/app/profile/_ui/user-actions/UserEditing";

interface IProfileActions  {
    component:React.ReactElement
}
export default function ProfileUserActions({id} : {id: number}) {

    const ProfileAction:IProfileActions[] = [
        {
          component:<UserEditing id={id}/>
        },{
          component:<UserDelete id={id}/>
        },
    ]



    return (
        <ul className={'flex justify-center flex-col w-full gap-y-2'}>
            {ProfileAction.map((action,index) => (
                <li key={index} className={'flex w-full justify-center '}>
                    {action.component}
                </li>
            ))}
        </ul>
    );
};