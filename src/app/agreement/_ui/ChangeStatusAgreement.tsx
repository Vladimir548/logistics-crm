'use client';

import { useMutation } from '@tanstack/react-query';
import { StatusOrder } from '@/interface/interface-registry';

import { DATASTATUSORDER } from '@/data/data-status-order';
import { useContextMenu } from '@/zustand/useContextMenu';
import toast from 'react-hot-toast';
import { ContextMenuItem } from '@/components/context-menu/ContextMenu';
import { QueryAgreement } from '@/app/api/query/query-agreement';
import {SelectItem} from "@/components/select/Select";
import SelectCustom from "@/components/select/SelectCustom";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function ChangeStatusAgreement() {
  const { contractAgreement, statusAgreement } = useContextMenu();
  const send = useReactQuerySubscription({query:'update-agreement', tracking:'agreement'})
  const { mutate } = useMutation({
    mutationKey: ['change-status-agreement'],
    mutationFn: (statusorder: StatusOrder) =>
      QueryAgreement.changeStatus(contractAgreement, statusorder),
    onSuccess: async () => {
      toast.success('Статус договора изменен');
      send({
        operation:'invalidate',
        entity:['get-all-agreement','get-all-registry'],
      })
    },
  });
  const handleChangeStatus = (status: StatusOrder) => {
    mutate(status);

  };
  return (

    <ContextMenuItem
        onSelect={(e: Event) => e.preventDefault()}
      className={'flex flex-col gap-y-2 w-full '}
    >
      <SelectCustom disabled={!contractAgreement} label={'Статус договора'}  defaultValue={statusAgreement === 'DEFAULT' ? '' : statusAgreement} onValueChange={handleChangeStatus}>
        {DATASTATUSORDER?.map((val) => <SelectItem key={val.value} value={val.value}> {val.label}</SelectItem>)}
      </SelectCustom>
    </ContextMenuItem>
  );
}
