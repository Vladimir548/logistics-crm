import {useContextMenu} from "@/zustand/useContextMenu";
import {IContextItem} from "@/app/(home)/_ui/Registry";
import ContextEditing from "@/components/context-menu/items/ContextEditing";
import {Row} from "@tanstack/react-table";
import {ICostumer} from "@/interface/interface-costumer";
import CostumerDelete from "@/app/costumer/_ui/CostumerDelete";

export default function CostumerContextMenu() {
    const getId = useContextMenu(state => state.getId);
    const id = useContextMenu(state => state.id);
    const  contextItem:IContextItem[] =[
        {
            component:<ContextEditing id={id} url={'costumer'}/>
        },
        {
            component:<CostumerDelete/>
        },
    ]
    const getDataForContext= (row: Row<ICostumer>) => {
        getId(row.original.id);

    }
    return {contextItem,getDataForContext}
};