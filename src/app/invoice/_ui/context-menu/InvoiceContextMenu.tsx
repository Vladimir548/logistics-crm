'use client'

import {useContextMenu} from "@/zustand/useContextMenu";
import {IContextItem} from "@/app/(home)/_ui/Registry";
import ContextEditing from "@/components/context-menu/items/ContextEditing";
import {Row} from "@tanstack/react-table";
import {IInvoice} from "@/interface/interface-invoice";
import InvoiceDelete from "@/app/invoice/_ui/context-menu/InvoiceDelete";

export default function InvoiceContextMenu() {
    const getId = useContextMenu(state => state.getId);
    const id = useContextMenu(state => state.id);

    const  contextItem:IContextItem[] =[

        {
            component:<ContextEditing id={id} url={'invoice'}/>
        },
        {
            component:<InvoiceDelete/>
        },
    ]
    const getDataForContext= (row: Row<IInvoice>) => {
        getId(row.original.id);
    }
    return {contextItem,getDataForContext}
};