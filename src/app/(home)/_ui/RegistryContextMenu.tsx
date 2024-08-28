import {useContextMenu} from "@/zustand/useContextMenu";
import {IContextItem} from "@/app/(home)/_ui/Registry";
import ChangeStatusAgreement from "@/app/agreement/_ui/ChangeStatusAgreement";
import ContextEditing from "@/components/context-menu/items/ContextEditing";
import {Row} from "@tanstack/react-table";
import {IRegistry} from "@/interface/interface-registry";
import ChangeStatusApplication from "@/app/application/_ui/context-menu/ChangeStatusApplication";
import RegistryAddInfo from "@/app/(home)/_ui/registry-context-menu/registry-add-info/RegistryAddInfo";
import RegistryDelete from "@/app/(home)/_ui/registry-context-menu/RegistryDelete";
import UploadFiles from "@/components/upload-files/UploadFiles";

export default function RegistryContextMenu() {
    const { getId, getStatusAgreement, getStatusApplication, getNumberApplication, getContractAgreement, getNumberInvoice,id } = useContextMenu();
    const contextItem: IContextItem[] = [
        {
            component: <ChangeStatusApplication />,
        },
        {
            component: <ChangeStatusAgreement />,
        },
        {
            component: <UploadFiles id={id}  />,
        }, {
            component: <RegistryAddInfo />,
        },
        {
            component: <ContextEditing  url={'/registry'} id={id}  />,
        },
        {
            component: <RegistryDelete />,
        },
    ];
    const getDataForContext = (row: Row<IRegistry>) => {
        getId(row.original.id);
        getStatusAgreement(row.original?.application?.agreement?.status);
        getStatusApplication(row.original?.application?.status);
        getNumberApplication(row.original?.application?.applicationNumber);
        getContractAgreement(row.original?.application?.agreement?.contractNumber);
        getNumberInvoice(row.original?.application?.invoice?.invoiceNumber);
    };
    return {contextItem,getDataForContext}
};