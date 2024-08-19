'use client';
import { QueryRegistry } from '@/app/api/query/query-registry';
import Table from '@/components/table/Table';
import { ColumnsRegistry } from '@/columns/ColumnsRegistry';
import {ReactElement} from 'react';
import { useValueSorting } from '@/zustand/useValueSorting';
import TopLayouts from "@/app/layouts/TopLayouts";
import useEffectUrl from "@/hooks/useEffectUrl";
import RegistryFilterObj from "@/app/(home)/_ui/RegistryFilterObj";
import RegistryContextMenu from "@/app/(home)/_ui/RegistryContextMenu";

export interface IContextItem {
  label?: string;
  component: ReactElement;
}

export default function Registry() {

  const { order, field } = useValueSorting();
  const filters =useEffectUrl()

  const filterObj = RegistryFilterObj()
  const {getDataForContext,contextItem} = RegistryContextMenu()
  return (
      <>
            <TopLayouts filter={filterObj} url={'registry'} />
            <Table  queryFn={(pageParam,search) => QueryRegistry.getAll({query:search,pageParam:pageParam,order:order,field:field,filter:filters})} queryKey={['get-all-registry',order,field,filters]} columns={ColumnsRegistry}  contextItem={contextItem}  getDataForContext={getDataForContext} />
      </>


  );
}
