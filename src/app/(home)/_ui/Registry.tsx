'use client';
import { QueryRegistry } from '@/app/api/query/query-registry';
import Table from '@/components/table/Table';
import { ColumnsRegistry } from '@/columns/ColumnsRegistry';
import {ReactElement, useEffect, } from 'react';
import { useValueSorting } from '@/zustand/useValueSorting';
import RegistryAddInfo from "@/app/(home)/_ui/registry-context-menu/registry-add-info/RegistryAddInfo";
import RegistryDelete from "@/app/(home)/_ui/registry-context-menu/RegistryDelete";
import PrintApplicationLink from "@/app/(home)/_ui/registry-context-menu/registry-add-info/PrintApplicationLink";
import TopLayouts from "@/app/layouts/TopLayouts";
import {IRegistry} from "@/interface/interface-registry";
import {useContextMenu} from "@/zustand/useContextMenu";
import {Row} from "@tanstack/react-table";
import ContextEditing from "@/components/context-menu/items/ContextEditing";
import ChangeStatusApplication from "@/app/application/_ui/context-menu/ChangeStatusApplication";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import ChangeStatusAgreement from "@/app/agreement/_ui/ChangeStatusAgreement";


export interface IContextItem {
  label?: string;
  component: ReactElement;
}
export default function Registry() {
  const send = useReactQuerySubscription({query:'update-application', tracking:'application'})
  useEffect(() => {
    send({
      operation:'invalidate',
      entity:['get-all-registry']
    })
  }, [send]);
  const { order, field } = useValueSorting();


  const { getId, getStatusAgreement, getStatusApplication, getNumberApplication, getContractAgreement, getNumberInvoice,id } = useContextMenu();
  const contextItem: IContextItem[] = [
    {
      component: <PrintApplicationLink />,
    },
    {
      component: <ChangeStatusApplication />,
    },
    {
      component: <ChangeStatusAgreement />,
    },
    {
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

  return (
      <>
            <TopLayouts url={'registry'}/>
            <Table  queryFn={(pageParam,search) => QueryRegistry.getAll({query:search,pageParam:pageParam,order:order,field:field})} queryKey={['get-all-registry',order,field]} columns={ColumnsRegistry}  contextItem={contextItem}  getDataForContext={getDataForContext} />
      </>


  );
}
