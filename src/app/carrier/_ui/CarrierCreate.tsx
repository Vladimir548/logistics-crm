'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';


import {  PatternFormat } from 'react-number-format';
import { ICarrier } from '@/interface/interface-carrier';
import {QueryCarrier} from "@/app/api/query/query-carrier";
import InputCustom from "@/components/input/InputCustom";

import FormLayouts from "@/app/layouts/FormLayouts";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function CarrierCreate() {
  const {  handleSubmit, control, reset } = useForm<ICarrier>({});
    const send = useReactQuerySubscription({query:'update-carrier', tracking:'carrier'})
  const { mutate } = useMutation({
    mutationKey: ['create-carrier'],
    mutationFn: (data: ICarrier) => QueryCarrier.create(data),
    onSuccess: () => {
      reset();
      toast.success('Запись добавлена');
        send({operation:'invalidate',entity:['get-all-carrier']})
    },
    onError: (error) => {
      const err = errorCatch(error);
      toast.error(err);
    },
  });
  const onSubmit: SubmitHandler<ICarrier> = (data) => {
    mutate(data);
  };
  return (
      <FormLayouts buttonVariant={'add'} handleFn={handleSubmit(onSubmit)} label={'Создать'}>
            <div >
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom  onValueChange={onChange} value={value} label={'Название'}/>
                  )}
                  name="name"
              />
            </div>
            <div >
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom  onValueChange={onChange} value={value} label={'Юридический и фактический адрес'}/>
                  )}
                  name="legalAndActualAddress"
              />
            </div>
            <div >
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom  onValueChange={onChange} value={value} label={'Почтовый адрес'}/>
                  )}
                  name="mailingAddress"
              />
            </div>
            <div >
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom  minLength={12}
                                    maxLength={12}  onValueChange={onChange} value={value} label={'ИНН'}/>
                  )}
                  name="inn"
              />
            </div>
            <div >

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
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
                        target: { value: v.value },
                      })
                    }
                    format={'#-##-##-##-#####-#'}
                  />
                )}
                name={'ogrn'}
              />
            </div>
            <div >
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom   minLength={9}
                                     maxLength={9}  onValueChange={onChange} value={value} label={'КПП'}/>
                  )}
                  name="kpp"
              />
            </div>
            <div >
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom    onValueChange={onChange} value={value} label={'Банк'}/>
                  )}
                  name="bank"
              />
            </div>
            <div >
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom      minLength={20}
                                        maxLength={20}  onValueChange={onChange} value={value} label={'Расчетный счет'}/>
                  )}
                  name="checkingAccount"
              />
            </div>
            <div >

              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom      minLength={20}
                                        maxLength={20}  onValueChange={onChange} value={value} label={'Кассовый счет'}/>
                  )}
                  name="cashAccount"
              />
            </div>
            <div >
              <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                      <InputCustom       minLength={9}
                                         maxLength={9}  onValueChange={onChange} value={value} label={'БИК'}/>
                  )}
                  name="bic"
              />
            </div>
      </FormLayouts>
  );
}
