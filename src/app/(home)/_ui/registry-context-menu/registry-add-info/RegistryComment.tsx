import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryRegistry } from '@/app/api/query/query-registry';
import { useContextMenu } from '@/zustand/useContextMenu';

import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/modal/Modal';

import { ContextMenuItem } from '@/components/context-menu/ContextMenu';
import {Button} from "@/components/buttons/Buttons";

export default function RegistryComment() {
  const { id } = useContextMenu();

  const { data } = useQuery({
    queryKey: ['get-comment-registry'],
    queryFn: () => QueryRegistry.getComment(id),
  });

  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  useEffect(() => {
    if (data?.comment) {
      setComment(data.comment);
    }
  }, [data]);
  const { mutate } = useMutation({
    mutationKey: ['add-comment'],
    mutationFn: () => QueryRegistry.addComment(id, comment.trim()),
    onSuccess: async () => {
      toast.success('Комментарий добавлен');
      await queryClient.invalidateQueries({ queryKey: ['all-registry'] });
    },
    onError: () => {
      toast.error('Ошибка при добавление комментария');
    },
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild className={'w-full'}>
          <ContextMenuItem onSelect={(e: Event) => e.preventDefault()}>
            <Button variant={"add"}

            >
              <p > Добавить комментарий</p>
            </Button>
          </ContextMenuItem>
        </DialogTrigger>

        <DialogContent className={'bg-black/80 backdrop-blur-2xl flex flex-col  '}>
          <DialogHeader>
            <DialogTitle className={'text-text'}>Добавление комментария</DialogTitle>
          </DialogHeader>
          <textarea
            value={comment}
            onInput={(event: any) => setComment(event.target.value)}
            placeholder={'Введите комментарий'}
            className={
              'w-full h-[200px] bg-[#051a21] border-2 border-[#0a2e39]  outline-none rounded-md  p-1 max-h-[400px] min-h-[100px] focus:bg-[#0a2e39] '
            }
          />

          <div className={'flex justify-end items-center gap-x-2'}>
            <Button variant={'add'}
              onClick={() => mutate()}

            >
              Добавить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
