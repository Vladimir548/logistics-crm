import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/modal/Modal';
import { ContextMenuItem } from '@/components/context-menu/ContextMenu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryRegistry } from '@/app/api/query/query-registry';
import toast from 'react-hot-toast';
import { useContextMenu } from '@/zustand/useContextMenu';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import InputCustom from "@/components/input/InputCustom";
import {Button} from "@/components/buttons/Buttons";

export interface IAddTickets {
  id: number;
  receiptFromUsToTheCustomer: string;
  receiptFromTheCarrier: string;
}

export default function RegistryTickets() {
  const { id } = useContextMenu();

  const { data } = useQuery({
    queryKey: ['get-tickets-registry'],
    queryFn: () => QueryRegistry.getTickets(id),
  });

  const queryClient = useQueryClient();
  const { handleSubmit, control } = useForm<IAddTickets>({
    defaultValues: {
      id: id,
    },
  });
  const { mutate } = useMutation({
    mutationKey: ['add-tickets'],
    mutationFn: (data: IAddTickets) => QueryRegistry.addTickets(data),
    onSuccess: async () => {
      toast.success('Квиток добавлен');
      await queryClient.invalidateQueries({ queryKey: ['all-registry'] });
    },
    onError: () => {
      toast.error('Ошибка при добавление квитка');
    },
  });
  const onSubmit: SubmitHandler<IAddTickets> = (data) => {
    mutate(data);
  };
  return (
    <div>
      <Dialog>
        {' '}
        <DialogTrigger asChild className={'w-full'}>
          <ContextMenuItem onSelect={(e: Event) => e.preventDefault()}>
            <Button className={'w-full'} variant={'add'}>
              <p>Добавить квитки</p>
            </Button>
          </ContextMenuItem>
        </DialogTrigger>
        <DialogContent className={'bg-black/80 backdrop-blur-2xl w-[300px] flex flex-col  '}>
          <DialogHeader>
            <DialogTitle className={'text-text'}>Добавление квитков</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-2 '}>
            <div className={'flex flex-col'}>

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <PatternFormat
                    defaultValue={data?.receiptFromUsToTheCustomer}
                     customInput={InputCustom}
                    label={'Квиток от нас'}
                    format={'##############'}
                    value={value}
                    onValueChange={(v) =>
                      onChange({
                        type: 'text',
                        target: { value: v.value },
                      })
                    }
                  />
                )}
                name="receiptFromUsToTheCustomer"
              />
            </div>
            <div className="flex flex-col">
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <PatternFormat
                    defaultValue={data?.receiptFromTheCarrier}
                    customInput={InputCustom}
                    label={'Квиток от перевозчика'}
                    format={'##############'}
                    value={value}
                    onValueChange={(v) =>
                      onChange({
                        type: 'text',
                        target: { value: v.value },
                      })
                    }
                  />
                )}
                name="receiptFromTheCarrier"
              />
            </div>
            <div className={'flex justify-end items-center gap-x-2'}>
              <Button variant={'add'}

              >
                Добавить
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
