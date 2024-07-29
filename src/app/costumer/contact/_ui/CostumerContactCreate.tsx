'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';
import { ICostumerContact } from '@/interface/interface-costumer-contact';
import { PatternFormat } from 'react-number-format';
import {QueryContactCostumer} from "@/app/api/query/query-contact-costumer";
import SelectCostumer from "@/app/(home)/create/registry-select/select/costumer/SelectCostumer";
import InputCustom from "@/components/input/InputCustom";
import FormLayouts from "@/app/layouts/FormLayouts";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";



export default function CostumerContactCreate({id}:{id?:number}) {
  const {  handleSubmit, control, reset } = useForm<ICostumerContact>({
      defaultValues:{
          costumerId:id
      }
  });
    const send = useReactQuerySubscription({query:'update-contact-costumer', tracking:'contact-costumer'})
  const { mutate } = useMutation({
    mutationKey: ['create-costumer-contact'],
    mutationFn: (data: ICostumerContact) => QueryContactCostumer.create(data),
    onSuccess: () => {
      reset();
      toast.success('Запись добавлена');
        send({operation:'invalidate',entity:['get-all-costumer-contact','get-costumer-id-contact']})
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
      <FormLayouts  buttonVariant={'add'} handleFn={handleSubmit(onSubmit)} label={'Создать'}>

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
                {!id && (
              <SelectCostumer control={control} field={'costumerId'}/>
                )}
            </div>
          </div>


      </FormLayouts>
  );
}
