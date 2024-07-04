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
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {Button} from "@/components/buttons/Buttons";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";


export default function ApplicationEditing() {
  const { id } = useContextMenu();
  // Сделать id а не номер договора
  // const {id} = useParams()
  useEffect(()=>{

  },[id])
  const send = useReactQuerySubscription({query:'update-applications',tracking:'up-application'})
  const {  handleSubmit, control }  =  useForm<IApplication>({
    defaultValues: async () => QueryApplication.getNumber( String(id)),
  });
  const { mutate } = useMutation({
    mutationKey: ['update-application'],
    mutationFn: (data: IApplication) => QueryApplication.update(data, String(id)),
    onSuccess: async () => {
      toast.success('Запись обновлена');
      send({
        operation:'invalidate',
        entity:['get-all-applications','all-registry'],
      })
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
    <div className={'h-full'}>
      <form onSubmit={handleSubmit(onSubmit)} className={' h-full border-text-dark border p-2  rounded-md'}>
        <div className="flex justify-end w-full border-b border-text mb-2">
          <Button variant={'editing'}

                  type={'submit'}
          >
            Сохранить
          </Button>
        </div>
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
        </div>



      </form>
    </div>
  );
}
