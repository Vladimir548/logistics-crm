import {useContextMenu} from "@/zustand/useContextMenu";
import {IContextItem} from "@/app/(home)/_ui/Registry";
import ContextEditing from "@/components/context-menu/items/ContextEditing";
import {Row} from "@tanstack/react-table";
import CostumerContactDelete from "@/app/costumer/contact/_ui/CostumerContactDelete";
import {ICostumerContact} from "@/interface/interface-costumer-contact";

export default function CostumerContactContextMenu() {
    const getId = useContextMenu(state => state.getId);
    const id = useContextMenu(state => state.id);
    const  contextItem:IContextItem[] =[
        {
            component:<ContextEditing id={id} url={'contact'}/>
        },
        {
            component:<CostumerContactDelete/>
        },
    ]
    const getDataForContext= (row: Row<ICostumerContact>) => {
        getId(row.original.id);

    }
    return {contextItem,getDataForContext}
};