'use client';
import {  useQuery } from '@tanstack/react-query';
import { QueryRegistry } from '@/app/api/query/query-registry';
import Table from '@/components/table/Table';
import { ColumnsRegistry } from '@/columns/ColumnsRegistry';
import {ReactElement, useEffect, useMemo, useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useValueSorting } from '@/zustand/useValueSorting';
import { Pagination } from '@nextui-org/pagination';
import RegistryAddInfo from "@/app/(home)/_ui/registry-context-menu/registry-add-info/RegistryAddInfo";
import RegistryChangeStatusAgreement from "@/app/(home)/_ui/registry-context-menu/registry-add-info/RegistryChangeStatusAgreement";
import RegistryDelete from "@/app/(home)/_ui/registry-context-menu/RegistryDelete";
import PrintApplicationLink from "@/app/(home)/_ui/registry-context-menu/registry-add-info/PrintApplicationLink";
import TopLayouts from "@/app/layouts/TopLayouts";
import {IRegistry} from "@/interface/interface-registry";
import {useContextMenu} from "@/zustand/useContextMenu";
import {Row} from "@tanstack/react-table";
import ContextEditing from "@/components/context-menu/items/ContextEditing";
import ContextChangeStatusApplication from "@/app/application/_ui/context-menu/ContextChangeStatusApplication";

import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";


export interface IContextItem {
  label?: string;
  component: ReactElement;
}
export default function Registry() {
  const searchParams = useSearchParams();
  const search = searchParams.get('q');
  const pageParam = searchParams.get('page');
  const send = useReactQuerySubscription({query:'update-applications', tracking:'up-application'})
  useEffect(() => {
    send({
      operation:'invalidate',
      entity:['all-registry']
    })
  }, [send]);
  const { order, field } = useValueSorting();
  const { data,isPending } = useQuery({
    queryKey: ['all-registry', search, order, field, pageParam],
    queryFn: () => QueryRegistry.getAllRegistry(search, order, field, 30, pageParam ),
  });
  const { push } = useRouter();
  const { getId, getStatusAgreement, getStatusApplication, getNumberApplication, getContractAgreement, getNumberInvoice,id } = useContextMenu();
  const contextItem: IContextItem[] = [
    {
      component: <PrintApplicationLink />,
    },
    {
      component: <ContextChangeStatusApplication />,
    },
    {
      component: <RegistryChangeStatusAgreement />,
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
    getStatusAgreement(row.original?.agreement?.status);
    getStatusApplication(row.original?.application?.status);
    getNumberApplication(row.original?.application?.applicationNumber);
    getContractAgreement(row.original?.agreement?.contractNumber);
    getNumberInvoice(row.original?.application?.invoice?.invoiceNumber);
  };

  return (
      <>
            <TopLayouts url={'registry'}/>
            <Table isLoading={isPending} columns={ColumnsRegistry} data={data?.registry} contextItem={contextItem}  getDataForContext={getDataForContext} />
            {data?.totalPage !== 1 && (
              <div
                className={
                  'absolute flex justify-center  left-0  bottom-0 w-full h-[60px] py-1  bg-table-body text-text'
                }
              >
                <Pagination
                  onChange={(val) => push(`?page=${val}`)}
                  variant={'faded'}
                  dotsJump={5}
                  total={data?.totalPage || 1}
                  showControls={true}
                />
              </div>
            )}
      </>


  );
}
