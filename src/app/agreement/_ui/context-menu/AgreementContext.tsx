import {useContextMenu} from "@/zustand/useContextMenu";
import {IContextItem} from "@/app/(home)/_ui/Registry";
import ContextEditing from "@/components/context-menu/items/ContextEditing";
import {Row} from "@tanstack/react-table";
import {IAgreement} from "@/interface/interface-agreement";
import AgreementDelete from "@/app/agreement/_ui/context-menu/AgreementDelete";
import ChangeStatusAgreement from "@/app/agreement/_ui/ChangeStatusAgreement";

export default function AgreementContext() {
    const getId = useContextMenu(state => state.getId);
    const id = useContextMenu(state => state.id);
    const getContract = useContextMenu(state => state.getContractAgreement);
    const  contextItem:IContextItem[] =[
        {
            component:<ChangeStatusAgreement/>
        },
        {
            component:<ContextEditing id={id} url={'agreement'}/>
        },
        {
            component:<AgreementDelete/>
        },
    ]
    const getDataForContext= (row: Row<IAgreement>) => {
        getId(row.original.id);
        getContract(row.original.contractNumber)
    }
    return {contextItem,getDataForContext}
};