'use client';

import { useMutation } from '@tanstack/react-query';

import { StatusOrder } from '@/interface/interface-registry';
import {SelectItem,} from '@/components/select/Select';
import { DATASTATUSORDER } from '@/data/data-status-order';
import { useContextMenu } from '@/zustand/useContextMenu';
import toast from 'react-hot-toast';
import { ContextMenuItem } from '@/components/context-menu/ContextMenu';
import { QueryApplication } from '@/app/api/query/query-application';
import SelectCustom from "@/components/select/SelectCustom";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function ContextChangeStatusApplication() {
  const send = useReactQuerySubscription({query:'update-applications',tracking:'up-application'})
  const { id, statusApplication } = useContextMenu();
  console.log(statusApplication)
  const { mutate } = useMutation({
    mutationKey: ['change-status'],
    mutationFn: (statusOrder: StatusOrder) =>
      QueryApplication.changeStatus(id, statusOrder),
    onSuccess: async () => {
      toast.success('Статус заявки изменен');
      send({
        operation:'invalidate',
        entity:['get-all-applications','all-registry'],
      })
    },
  });

  const handleChangeStatus = (status: StatusOrder) => {
    mutate(status);
  };

  return (
    <ContextMenuItem
      onSelect={(e: Event) => e.preventDefault()}
      className={'flex flex-col gap-y-2 w-full'}
    >
      <SelectCustom  label={'Статус заявки'}  defaultValue={statusApplication} onValueChange={handleChangeStatus}>
        {DATASTATUSORDER?.map((val) => <SelectItem key={val.value} value={val.value}> {val.label}</SelectItem>)}
      </SelectCustom>
    </ContextMenuItem>
  );
}
