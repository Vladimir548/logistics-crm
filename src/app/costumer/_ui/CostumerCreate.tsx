'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ICostumer } from '@/interface/interface-costumer';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';


import { PatternFormat } from 'react-number-format';
import HomeLayout from '@/app/layouts/HomeLayout';
import {QueryCostumer} from "@/app/api/query/QueryCostumer";
import InputCustom from "@/components/input/InputCustom";
import {Button} from "@/components/buttons/Buttons";

export default function CostumerCreate() {
  const { register, handleSubmit, control, reset } = useForm<ICostumer>({});

  const { mutate } = useMutation({
    mutationKey: ['create-costumer'],
    mutationFn: (data: ICostumer) => QueryCostumer.create(data),
    onSuccess: () => {
      reset();
      toast.success('Запиись добавлена');
    },
    onError: (error) => {
      const err = errorCatch(error);
      toast.error(err);
    },
  });
  const onSubmit: SubmitHandler<ICostumer> = (data) => {
    console.log(data);
    mutate(data);
  };
  return (
    <div>

        <form onSubmit={handleSubmit(onSubmit)} className={' m-2 '}>
          <div className="flex  gap-2 flex-wrap">
            <div className={'flex flex-col gap-x-2'}>
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom onValueChange={onChange} value={value} label={'Название'}/>
                  )}
                  name="name"
              />
            </div>
            <div className={'flex flex-col gap-x-2'}>
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom onValueChange={onChange} value={value} label={'Юридический и фактический адрес'}/>
                  )}
                  name="legalAndActualAddress"
              />
            </div>
            <div className={'flex flex-col gap-x-2'}>
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom onValueChange={onChange} value={value} label={'Почтовый адрес'}/>
                  )}
                  name="mailingAddress"
              />
            </div>
            <div className={'flex flex-col gap-x-2'}>
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom minLength={12}
                                   maxLength={12} onValueChange={onChange} value={value} label={'ИНН'}/>
                  )}
                  name="inn"
              />
            </div>
            <div className={'flex flex-col gap-x-2'}>

              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <PatternFormat
                          customInput={InputCustom}
                          label={'ОГРН'}
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
                          format={'#-##-##-##-#####-#'}
                      />
                  )}
                  name={'ogrn'}
              />
            </div>
            <div className={'flex flex-col gap-x-2'}>
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom minLength={9}
                                   maxLength={9} onValueChange={onChange} value={value} label={'КПП'}/>
                  )}
                  name="kpp"
              />
            </div>
            <div className={'flex flex-col gap-x-2'}>
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom onValueChange={onChange} value={value} label={'Банк'}/>
                  )}
                  name="bank"
              />
            </div>
            <div className={'flex flex-col gap-x-2'}>
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom minLength={20}
                                   maxLength={20} onValueChange={onChange} value={value} label={'Расчетный счет'}/>
                  )}
                  name="checkingAccount"
              />
            </div>
            <div className={'flex flex-col gap-x-2'}>

              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom minLength={20}
                                   maxLength={20} onValueChange={onChange} value={value} label={'Кассовый счет'}/>
                  )}
                  name="cashAccount"
              />
            </div>
            <div className={'flex flex-col gap-x-2'}>
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom minLength={9}
                                   maxLength={9} onValueChange={onChange} value={value} label={'БИК'}/>
                  )}
                  name="bic"
              />
            </div>
          </div>
          <Button type={'submit'} variant={"add"}>Создать</Button>
        </form>

    </div>
  );
}
