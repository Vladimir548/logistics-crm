'use client';

import { getIdUser } from '@/services/auth/auth.helper';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { IAgreement } from '@/interface/interface-agreement';
import { useMutation } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';

import { NumericFormat } from 'react-number-format';

import {parseDate,
} from '@internationalized/date';

import SelectPaymentMethod
  from "@/app/(home)/create/registry-select/select/payment-method/SelectPaymentMethod";
import {QueryAgreement} from "@/app/api/query/query-agreement";
import SelectRegistry from "@/app/agreement/_ui/select/SelectRegistry";
import SelectCarrier from "@/app/(home)/create/registry-select/select/carrier/SelectCarrier";
import InputCustom from "@/components/input/InputCustom";
import InputDateCustom from "@/components/input/InputDateCustom";
import FormLayouts from "@/app/layouts/FormLayouts";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function AgreementCreate() {
  const idUser = getIdUser();
  const { handleSubmit, control, reset,getValues } = useForm<IAgreement>({
    defaultValues: {
      userId: Number(idUser),
    },
  });
    const send = useReactQuerySubscription({query:'update-agreement', tracking:'agreement'})
  const { mutate } = useMutation({
    mutationKey: ['create-agreement'],
    mutationFn: (data: IAgreement) => QueryAgreement.create(data),
    onSuccess: () => {
      reset();
      toast.success('Запись добавлена');
        send({
            operation:'invalidate',
            entity:['get-all-agreement','get-all-registry','get-all-invoice'],
        })
    },
    onError: (error) => {
      const err = errorCatch(error);
      toast.error(err);
    },
  });
  const onSubmit: SubmitHandler<IAgreement> = (data) => {
    mutate(data);
  };

  return (
      <FormLayouts handleFn={handleSubmit(onSubmit)} label={'Создать'} buttonVariant={'add'} >
          <div >
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Номер договора'}/>
                )}
                name="contractNumber"
            />
          </div>

          <div >
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Маршрут'}/>
                )}
                name="route"
            />
          </div>
          <div >
            <Controller
                name="dateOfDownload"
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputDateCustom onChange={(value) => onChange(value?.toString())}
                                     value={value ? parseDate(value) : undefined} label={'Дата загрузки'}/>
                )}
            />
          </div>
          <div >
            <Controller
                name="unloadingDate"
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputDateCustom  isInvalid={getValues('dateOfDownload') > value}  onChange={(value) => onChange(value?.toString())}
                                     value={value ? parseDate(value) : undefined} label={'Дата выгрузки'}/>
                )}
            />
          </div>
          <div >
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <NumericFormat
                        customInput={InputCustom}
                        label={'Сумма оплаты перевозчику'}
                        className={'w-[230px]'}
                        suffix=" ₽"
                        allowNegative
                        value={value}
                        thousandSeparator=" "
                        onValueChange={(v) =>
                            onChange({
                              type: 'text',
                              target: {value: v.value},
                            })
                        }
                    />
                )}
                name="amountOfPaymentToTheCarrier"
            />
          </div>
          <div >
            <Controller
                name="dateOfPaymentToTheCarrier"
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputDateCustom onChange={(value) => onChange(value?.toString())}
                                     value={value ? parseDate(value) : undefined} label={'Дата оплаты'}/>
                )}
            />
          </div>
          <div >
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Срок оплаты'}/>
                )}
                name="paymentDeadlineToTheCarrier"
            />
          </div>
          <div >
            <SelectPaymentMethod<IAgreement> control={control} field={'methodOfPaymentToTheCarrier'}/>
          </div>
          <SelectRegistry control={control}/>
          <div >
            <SelectCarrier control={control} field={"carrierId"} fieldContact={'carrierContactPersonId'}
                                       fieldDriver={'driverId'}/>
          </div>
      </FormLayouts>
  );
}
