'use client'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { useContextMenu } from '@/zustand/useContextMenu';
import { IAgreement } from '@/interface/interface-agreement';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';
import { parseDate } from '@internationalized/date';
import {QueryAgreement} from "@/app/api/query/query-agreement";
import SelectCarrier from "@/app/(home)/create/registry-select/select/carrier/SelectCarrier";
import InputCustom from "@/components/input/InputCustom";
import InputDateCustom from "@/components/input/InputDateCustom";
import SelectPaymentMethod
  from "@/app/(home)/create/registry-select/select/payment-method/SelectPaymentMethod";
import SelectRegistry from "@/app/agreement/_ui/select/SelectRegistry";
import FormLayouts from "@/app/layouts/FormLayouts";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function AgreementEditing() {
  const { id } = useContextMenu();

  const { data } = useQuery({
    queryKey: ['get-agreement-contract',id],
    queryFn: () => QueryAgreement.getContract(Number(id)),
  });
  const {  handleSubmit, control,  } = useForm<IAgreement>({
    defaultValues: {
      ...data,
      dateOfPaymentToTheCarrier: data?.dateOfPaymentToTheCarrier?.split('T')[0],
      dateOfDownload: data?.dateOfDownload?.split('T')[0],
      unloadingDate: data?.unloadingDate?.split('T')[0],
    },
  });
    const send = useReactQuerySubscription({query:'update-agreement', tracking:'agreement'})
  const { mutate } = useMutation({
    mutationKey: ['update-agreement'],
    mutationFn: (data: IAgreement) => QueryAgreement.update(data, id),
    onSuccess: async () => {
      toast.success('Запись обнавлена');
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
      <FormLayouts buttonVariant={'editing'} handleFn={handleSubmit(onSubmit)} label={'Сохранить'}>
          <div className="flex flex-col gap-y-2">
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Номер договора'}/>
                )}
                name="contractNumber"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Маршрут'}/>
                )}
                name="route"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Controller
                name="dateOfDownload"
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputDateCustom onChange={(value) => onChange(value?.toString())}
                                     value={value ? parseDate(value) : undefined} label={'Дата загрузки'}/>
                )}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Controller
                name="unloadingDate"
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputDateCustom onChange={(value) => onChange(value?.toString())}
                                     value={value ? parseDate(value) : undefined} label={'Дата выгрузки'}/>
                )}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <NumericFormat
                        customInput={InputCustom}
                        label={'Сумма оплаты перевозчику'}
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
          <div className="flex flex-col gap-y-2">
            <Controller
                name="dateOfPaymentToTheCarrier"
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputDateCustom onChange={(value) => onChange(value?.toString())}
                                     value={value ? parseDate(value) : undefined} label={'Дата оплаты'}/>
                )}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Срок оплаты'}/>
                )}
                name="paymentDeadlineToTheCarrier"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <SelectPaymentMethod control={control} field={'methodOfPaymentToTheCarrier'}/>
          </div>
          <SelectRegistry control={control}/>
          <div className="flex flex-col gap-y-2">
            <SelectCarrier control={control} field={"carrierId"} fieldContact={'carrierContactPersonId'}
                           fieldDriver={'driverId'}/>
          </div>

      </FormLayouts>
  );
}
