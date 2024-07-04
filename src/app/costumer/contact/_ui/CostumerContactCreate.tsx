'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';
import { ICostumerContact } from '@/interface/interface-costumer-contact';
import { PatternFormat } from 'react-number-format';
import HomeLayout from '@/app/layouts/HomeLayout';
import {QueryContactCostumer} from "@/app/api/query/query-contact-costumer";
import SelectCostumer from "@/app/(home)/create/registry-select/select/costumer/SelectCostumer";
import InputCustom from "@/components/input/InputCustom";
import {Button} from "@/components/buttons/Buttons";

export default function CostumerContactCreate() {
  const { register, handleSubmit, control, reset } = useForm<ICostumerContact>({});

  const { mutate } = useMutation({
    mutationKey: ['create-costumer'],
    mutationFn: (data: ICostumerContact) => QueryContactCostumer.create(data),
    onSuccess: () => {
      reset();
      toast.success('Запиись добавлена');
    },
    onError: (error) => {
      const err = errorCatch(error);
      toast.error(err);
    },
  });
  const onSubmit: SubmitHandler<ICostumerContact> = (data) => {
    mutate(data);
  };
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className={'m-2'}>
          <div className="flex  gap-2 flex-wrap">
            <div className={'flex flex-col gap-x-2'}>
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom onValueChange={onChange} value={value} label={'ФИО'}/>
                  )}
                  name="fullName"
              />
            </div>
            <div className={'flex flex-col gap-x-2'}>

              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <PatternFormat
                          customInput={InputCustom}
                          label={'Номер телефона'}
                          allowEmptyFormatting
                          mask="_"
                          className={'fieldCreate w-[200px]'}
                          value={value}
                          onValueChange={(v) =>
                              onChange({
                                type: 'text',
                                target: {value: v.value},
                              })
                          }
                          format="+7 (###) ###-##-##"
                      />
                  )}
                  name={'numberPhone'}
              />
            </div>
            <div className={'flex flex-col gap-x-2'}>

              <SelectCostumer control={control} field={'costumerId'}/>
            </div>
          </div>
            <Button  type={'submit'} variant={'add'}>Создать</Button>

        </form>

    </div>
  );
}
