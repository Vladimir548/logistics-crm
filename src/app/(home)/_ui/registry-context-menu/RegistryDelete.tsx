'use client';

import { useMutation } from '@tanstack/react-query';
import { QueryRegistry } from '@/app/api/query/query-registry';
import { useContextMenu } from '@/zustand/useContextMenu';
import {
  AlertDialog, AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/alert/Alert';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import { ContextMenuItem } from '@/components/context-menu/ContextMenu';
import {Button} from "@/components/buttons/Buttons";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
export default function RegistryDelete() {
  const { id } = useContextMenu();
  const send = useReactQuerySubscription({query:'update-application', tracking:'application'})
  const { mutate } = useMutation({
    mutationKey: ['delete-registry'],
    mutationFn: () => QueryRegistry.delete(id),
    onSuccess: async () => {
      toast.success('Запись удалена');
      send({
        operation:'invalidate',
        entity:['get-all-registry','get-all-application','get-all-agreement','get-all-invoice']
      })
    },
    onError: () => {
      toast.error('Ошибка при удалении записи');
    },
  });

  return (
    <ContextMenuItem
      onSelect={(e: Event) => e.preventDefault()}
      className={'flex  flex-col gap-y-2 w-full'}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild className={'w-full'}>
          <Button
           variant={'delete'}
          >
            <span>
              <MdDelete size={20} />
            </span>
            <p>Удалить запись</p>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className={'bg-secondary-cust/50 border border-text backdrop-blur-2xl '}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Внимание! Вы уверены, что хотите удалить этот элемент? Все зависимые
              элементы также будут удалены.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className={'flex justify-end items-center gap-x-2'}>
            <AlertDialogCancel asChild>
              <Button
               variant={'default'}
              >
                Закрыть
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
            <Button variant={'delete'}
              onClick={() => mutate()}

            >
              Удалить
            </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </ContextMenuItem>
  );
}
