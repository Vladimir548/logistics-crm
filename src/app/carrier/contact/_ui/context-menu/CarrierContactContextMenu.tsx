import {useContextMenu} from "@/zustand/useContextMenu";
import {IContextItem} from "@/app/(home)/_ui/Registry";
import ContextEditing from "@/components/context-menu/items/ContextEditing";
import {Row} from "@tanstack/react-table";
import CarrierContactDelete from "@/app/carrier/contact/_ui/CarrierContactDelete";
import {ICarrierContact} from "@/interface/interface-carrier-contact";

export default function CarrierContactContextMenu() {
    const getId = useContextMenu(state => state.getId);
    const id = useContextMenu(state => state.id);
    const  contextItem:IContextItem[] =[
        {
            component:<ContextEditing id={id} url={'contact'}/>
        },
        {
            component:<CarrierContactDelete/>
        },
    ]
    const getDataForContext= (row: Row<ICarrierContact>) => {
        getId(row.original.id);

    }
    return {contextItem,getDataForContext}
};