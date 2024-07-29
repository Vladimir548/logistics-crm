'use client';

import { useMutation } from '@tanstack/react-query';
import { useContextMenu } from '@/zustand/useContextMenu';
import toast from 'react-hot-toast';
import {QueryApplication} from "@/app/api/query/query-application";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import AlertDelete from "@/components/alert/AlertDelete";
export default function ApplicationDelete() {
  const { id } = useContextMenu();
  const send = useReactQuerySubscription({query:'update-application', tracking:'application'})
  const { mutate } = useMutation({
    mutationKey: ['delete-application'],
    mutationFn: () => QueryApplication.delete(id),
    onSuccess: async () => {
      toast.success('Запись удалена');
      send({operation:'invalidate',entity:['get-all-application','get-all-registry']})
    },
    onError: () => {
      toast.error('Ошибка при удалении записи');
    },
  });

  const onDelete = ()=>{
    mutate()

  }
  return (
      <AlertDelete context={true} onDelete={onDelete}/>
  );
}
