'use client'
import {useContextMenu} from "@/zustand/useContextMenu";
import {IContextItem} from "@/app/(home)/_ui/Registry";

import ContextEditing from "@/components/context-menu/items/ContextEditing";

import {Row} from "@tanstack/react-table";
import {ICostumer} from "@/interface/interface-costumer";

import CarrierDelete from "@/app/carrier/_ui/CarrierDelete";

export default function CarrierContextMenu() {
    const getId = useContextMenu(state => state.getId);
    const id = useContextMenu(state => state.id);
    const  contextItem:IContextItem[] =[
        {
            component:<ContextEditing id={id} url={'carrier'}/>
        },
        {
            component:<CarrierDelete/>
        },
    ]
    const getDataForContext= (row: Row<ICostumer>) => {
        getId(row.original.id);

    }
    return {contextItem,getDataForContext}
};