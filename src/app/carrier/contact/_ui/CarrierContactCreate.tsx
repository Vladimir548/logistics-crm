'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';
import { PatternFormat } from 'react-number-format';
import { ICarrierContact } from '@/interface/interface-carrier-contact';
import {QueryContactCarrier} from "@/app/api/query/query-contact-carrier";
import SelectCarrier from "@/app/(home)/create/registry-select/select/carrier/SelectCarrier";
import InputCustom from "@/components/input/InputCustom";
import FormLayouts from "@/app/layouts/FormLayouts";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function CarrierContactCreate({id}:{id?:number}) {
  const { handleSubmit, control, reset } = useForm<ICarrierContact>({
      defaultValues:{
          carrierId:id
      }
  });
    const send = useReactQuerySubscription({query:'update-carrier-contact', tracking:'carrier-contact'})
  const { mutate } = useMutation({
    mutationKey: ['create-carrier-contact'],
    mutationFn: (data: ICarrierContact) => QueryContactCarrier.create(data),
    onSuccess: () => {
      reset();
      toast.success('Запись добавлена');
        send({operation:'invalidate',entity:['get-all-carrier-contact']})
    },
    onError: (error) => {
      const err = errorCatch(error);
      toast.error(err);
    },
  });
  const onSubmit: SubmitHandler<ICarrierContact> = (data) => {
    mutate(data);
  };
  return (
      <FormLayouts buttonVariant={'add'} handleFn={handleSubmit(onSubmit)} label={'Создать'}>
            <div >
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom   onValueChange={onChange} value={value} label={'ФИО'}/>
                  )}
                  name="fullName"
              />
            </div>
            <div >

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
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
                        target: { value: v.value },
                      })
                    }
                    format="+7 (###) ###-##-##"
                  />
                )}
                name={'numberPhone'}
              />
            </div>
            <div className={'flex gap-x-2'}>
                {!id &&(
              <SelectCarrier  control={control} field={'carrierId'} />

                )}
            </div>
      </FormLayouts>
  );
}
