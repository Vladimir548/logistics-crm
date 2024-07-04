'use client';

import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';
import { IAccountNumber } from '@/interface/interface-account-number';
import {QueryAccountNumber} from "@/app/api/query/query-account-number";
import InputCustom from "@/components/input/InputCustom";
import {Button} from "@/components/buttons/Buttons";

export default function AccountNumberCreate() {
  const { register, handleSubmit, control, reset } = useForm<IAccountNumber>({
  });
  const { mutate } = useMutation({
    mutationKey: ['create-account-number'],
    mutationFn: (data: IAccountNumber) => QueryAccountNumber.create(data),
    onSuccess: () => {
      reset();
      toast.success('Запиись добавлена');
    },
    onError: (error) => {
      const err = errorCatch(error);
      toast.error(err);
    },
  });
  const onSubmit: SubmitHandler<IAccountNumber> = (data) => {
    mutate(data);
  };
  return (
    <div>

        <form onSubmit={handleSubmit(onSubmit)} className={'m-2'}>
          <div className="flex  gap-2 flex-wrap">
            <div className="flex flex-col gap-y-2">
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom min={20}
                                   max={20}
                                   minLength={20}
                                   maxLength={20} onValueChange={onChange} value={value} label={'Номер счета'}/>
                  )}
                  name="account"
              />

            </div>
          </div>
         <Button type={"submit"} variant={"add"}>Создать</Button>
        </form>

    </div>
  );
}
