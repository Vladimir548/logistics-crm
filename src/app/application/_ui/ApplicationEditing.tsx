'use client'
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import {useMutation} from '@tanstack/react-query';
import { useContextMenu } from '@/zustand/useContextMenu';
import { IApplication } from '@/interface/interface-application';
import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';


import InputCustom from "@/components/input/InputCustom";
import {QueryApplication} from "@/app/api/query/query-application";
import SelectCostumer from "@/app/(home)/create/registry-select/select/costumer/SelectCostumer";
import SelectPaymentMethod from "@/app/(home)/create/registry-select/select/payment-method/SelectPaymentMethod";
import {useEffect} from "react";

import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import FormLayouts from "@/app/layouts/FormLayouts";


export default function ApplicationEditing() {
  const { id } = useContextMenu();
  useEffect(()=>{

  },[id])
    const send = useReactQuerySubscription({query:'update-application', tracking:'application'})
  const {  handleSubmit, control }  =  useForm<IApplication>({
    defaultValues: async () => QueryApplication.getNumber(id),
  });
  const { mutate } = useMutation({
    mutationKey: ['update-application'],
    mutationFn: (data: IApplication) => QueryApplication.update(data, String(id)),
    onSuccess: () => {
      toast.success('Запись обновлена');
        send({operation:'invalidate',entity:['get-all-application','get-all-registry']})
    },
    onError: (error) => {
      const err = errorCatch(error);
      toast.error(err);
    },
  });

  const onSubmit: SubmitHandler<IApplication> = (data) => {
    mutate(data);
  };

  return (
      <FormLayouts handleFn={handleSubmit(onSubmit)} label={'Сохранить'} buttonVariant={'editing'} >
          <div className="flex flex-col gap-y-2">
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Номер заявки'}/>
                )}
                name="applicationNumber"
            />

          </div>
          <div className="flex flex-col gap-y-2">

            <SelectCostumer control={control} field={'costumerId'}
                                          fieldContact={'costumerContactPersonId'}/>
          </div>
          <div className="flex flex-col gap-y-2">
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Масса'}/>
                )}
                name="weight"
            />
          </div>
          <div className="flex flex-col gap-y-2">

            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Адрес доставки'}/>
                )}
                name="unloadingAddress"
            />
          </div>
          <div className="flex flex-col gap-y-2">

            <SelectPaymentMethod control={control} field={'paymentMethodToUs'}/>

          </div>
    </FormLayouts>
  );
}
