import {IContextItem} from "@/app/(home)/_ui/Registry";
import AccountNumberDelete from "@/app/account-number/_ui/context-menu/AccountNumberDelete";
import {Row} from "@tanstack/react-table";
import {IAccountNumber} from "@/interface/interface-account-number";
import {useContextMenu} from "@/zustand/useContextMenu";

import ContextEditing from "@/components/context-menu/items/ContextEditing";

export default function AccountNumberContext() {
    const getId = useContextMenu(state => state.getId);
    const id = useContextMenu(state => state.id);
    const  contextItem:IContextItem[] =[
        {
            component:<AccountNumberDelete/>
        },
        {
            component:<ContextEditing id={id} url={'account-number'}/>
        },
    ]
    const getDataForContext= (row: Row<IAccountNumber>) => {
        getId(row.original.id);
    }
    return {contextItem,getDataForContext}
};