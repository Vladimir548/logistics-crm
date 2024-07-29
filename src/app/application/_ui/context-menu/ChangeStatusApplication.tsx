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

export default function ChangeStatusApplication() {
  const send = useReactQuerySubscription({query:'update-application', tracking:'application'})
  const { statusApplication,numberApplication } = useContextMenu();
  const { mutate } = useMutation({
    mutationKey: ['change-status'],
    mutationFn: (statusOrder: StatusOrder) =>
      QueryApplication.changeStatus(numberApplication, statusOrder),
    onSuccess: async () => {
      toast.success('Статус заявки изменен');
      send({operation:'invalidate',entity:['get-all-application','get-all-registry']})
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
      <SelectCustom disabled={!numberApplication}  label={'Статус заявки'}  defaultValue={statusApplication === 'DEFAULT' ? '' : statusApplication} onValueChange={handleChangeStatus}>
        {DATASTATUSORDER?.map((val) => <SelectItem key={val.value} value={val.value}> {val.label}</SelectItem>)}
      </SelectCustom>
    </ContextMenuItem>
  );
}
