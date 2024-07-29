import {useContextMenu} from "@/zustand/useContextMenu";
import {IContextItem} from "@/app/(home)/_ui/Registry";
import ContextEditing from "@/components/context-menu/items/ContextEditing";
import {Row} from "@tanstack/react-table";
import CarrierDriverDelete from "@/app/carrier/driver/_ui/CarrierDriverDelete";
import {IDriver} from "@/interface/interface-driver";

export default function CarrierDriverContextMenu() {
    const getId = useContextMenu(state => state.getId);
    const id = useContextMenu(state => state.id);
    const  contextItem:IContextItem[] =[
        {
            component:<ContextEditing id={id} url={'driver'}/>
        },
        {
            component:<CarrierDriverDelete/>
        },
    ]
    const getDataForContext= (row: Row<IDriver>) => {
        getId(row.original.id);

    }
    return {contextItem,getDataForContext}
};