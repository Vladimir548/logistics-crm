'use client';

import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import { IApplication } from '@/interface/interface-application';


import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';

import { getIdUser } from '@/services/auth/auth.helper';
import {QueryApplication} from "@/app/api/query/query-application";
import SelectCostumer from "@/app/(home)/create/registry-select/select/costumer/SelectCostumer";
import InputCustom from "@/components/input/InputCustom";
import SelectPaymentMethod from "@/app/(home)/create/registry-select/select/payment-method/SelectPaymentMethod";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import FormLayouts from "@/app/layouts/FormLayouts";

export default function ApplicationCreate() {
  const idUser = getIdUser();
  const {  handleSubmit, control, reset } = useForm<IApplication>({
    defaultValues: {
      userId: Number(idUser),
    },
  });
  const send = useReactQuerySubscription({query:'update-applications', tracking:'up-application'})
  const { mutate } = useMutation({
    mutationKey: ['create-application'],
    mutationFn: (data: IApplication) => QueryApplication.create(data),
    onSuccess: () => {
      send({operation:'invalidate',entity:['get-all-applications','all-registry']})
      reset();
      toast.success('Запиись добавлена');
    },
    onError: (error) => {
      const err = errorCatch(error);

      toast.error(err);
    },
  });

  const onSubmit: SubmitHandler<IApplication> = (data) => {
    mutate(data)

  };
  return (
   <FormLayouts buttonVariant={'add'} handleFn={handleSubmit(onSubmit)} label={'Создать'}>
          <div >
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Номер заявки'}/>
                )}
                name="applicationNumber"
            />
          </div>
          <div >
            <SelectCostumer control={control} field={'costumerId'} fieldContact={'costumerContactPersonId'} />
          </div>
          <div >
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Масса'}/>
                )}
                name="weight"
            />
          </div>
          <div >

            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Адрес доставки'}/>
                )}
                name="unloadingAddress"
            />
          </div>
          <div >
            <SelectPaymentMethod control={control} field={'paymentMethodToUs'} />
          </div>
   </FormLayouts>

  );
}
