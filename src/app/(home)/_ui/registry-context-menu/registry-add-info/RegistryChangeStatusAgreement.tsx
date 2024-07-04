'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StatusOrder } from '@/interface/interface-registry';

import { DATASTATUSORDER } from '@/data/data-status-order';
import { useContextMenu } from '@/zustand/useContextMenu';
import toast from 'react-hot-toast';
import { ContextMenuItem } from '@/components/context-menu/ContextMenu';
import { QueryAgreement } from '@/app/api/query/query-agreement';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from "@/components/select/Select";
import SelectCustom from "@/components/select/SelectCustom";

export default function RegistryChangeStatusAgreement() {
  const { contractAgreement, statusAgreement } = useContextMenu();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['change-status'],
    mutationFn: (statusorder: StatusOrder) =>
      QueryAgreement.changeStatus(contractAgreement, statusorder),
    onSuccess: async () => {
      toast.success('Статус договора изменен');
      await queryClient.invalidateQueries({ queryKey: ['all-registry'] });
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
      <SelectCustom  label={'Статус договора'}  defaultValue={statusAgreement} onValueChange={handleChangeStatus}>
        {DATASTATUSORDER?.map((val) => <SelectItem key={val.value} value={val.value}> {val.label}</SelectItem>)}
      </SelectCustom>
    </ContextMenuItem>
  );
}
