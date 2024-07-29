import {useContextMenu} from "@/zustand/useContextMenu";
import {IContextItem} from "@/app/(home)/_ui/Registry";
import ChangeStatusApplication from "@/app/application/_ui/context-menu/ChangeStatusApplication";
import ContextEditing from "@/components/context-menu/items/ContextEditing";
import ApplicationDelete from "@/app/application/_ui/context-menu/ApplicationDelete";
import {Row} from "@tanstack/react-table";
import {IApplication} from "@/interface/interface-application";

export default function ApplicationContextMenu() {
    const {getNumberApplication,getStatusApplication,getId,id}=useContextMenu()
    const contextItem:IContextItem[] = [
        {
            component:<ChangeStatusApplication />
        },
        {
            component:<ContextEditing url={'/application'} id={id} />
        }, {
            component:<ApplicationDelete />
        },
    ]
    const getDataForContext = (row: Row<IApplication>) => {
        getId(row.original.id)
        getStatusApplication(row.original.status);
        getNumberApplication(row.original.applicationNumber);
    };

    return{contextItem,getDataForContext}
};