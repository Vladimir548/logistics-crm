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
import {Button} from "@/components/buttons/Buttons";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function ApplicationCreate() {
  const idUser = getIdUser();
  console.log(idUser)
  const { register, handleSubmit, control, reset } = useForm<IApplication>({
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={'m-2'}>
        <div className="flex  gap-2 flex-wrap">
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

            <SelectCostumer<IApplication> control={control} field={'costumerId'} fieldContact={'costumerContactPersonId'} />
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
            <SelectPaymentMethod control={control} field={'paymentMethodToUs'} />
          </div>
        </div>

          <Button  type={'submit'} variant={'add'}>Создать</Button>

      </form>
    </div>
  );
}
