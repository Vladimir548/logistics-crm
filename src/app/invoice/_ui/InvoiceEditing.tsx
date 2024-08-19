'use client'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';
import { IInvoice } from '@/interface/interface-invoice';
import { QueryInvoice } from '@/app/api/query/query-invoice';
import InputCustom from "@/components/input/InputCustom";
import InputDateCustom from "@/components/input/InputDateCustom";
import {parseDate} from "@internationalized/date";
import InvoiceSelectApplication from "@/app/invoice/_ui/select/InvoiceSelectApplication";
import InvoiceSelectAccountNumber from "@/app/invoice/_ui/select/InvoiceSelectAccountNumber";
import SelectPaymentMethod from "@/app/(home)/create/registry-select/select/payment-method/SelectPaymentMethod";
import FormLayouts from "@/app/layouts/FormLayouts";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";
import {useParams} from "next/navigation";
export default function InvoiceEditing() {
  const {id} = useParams<{id:string}>()
  const { data } = useQuery({
    queryKey: ['get-number-invoice'],
    queryFn: () => QueryInvoice.getNumber(Number(id)),
  });
  const { handleSubmit, control,reset } = useForm<IInvoice>();
    useEffect(() => {
        reset({
            ...data,
            dateOfPaymentToUs: data?.dateOfPaymentToUs?.split('T')[0],
        })
    }, [data]);
    const send = useReactQuerySubscription({query:'update-invoice', tracking:'invoice'})
  const { mutate } = useMutation({
    mutationKey: ['update-invoice'],
    mutationFn: (data: IInvoice) => QueryInvoice.update(data, Number(id)),
    onSuccess: async () => {
      toast.success('Запись обнавлена');
        send({operation:'invalidate',entity:['get-all-application','get-all-registry','get-all-invoice','get-number-invoice']})
    },
    onError: (error) => {
      const err = errorCatch(error);
      toast.error(err);
    },
  });
  const onSubmit: SubmitHandler<IInvoice> = (data) => {
    mutate(data);
  };
  return (
      <FormLayouts buttonVariant={'editing'} handleFn={handleSubmit(onSubmit)} label={'Сохранить'}>
          <div className="flex flex-col gap-y-2">
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Номер УПД'}/>
                )}
                name="invoiceNumber"
            />
          </div>
          <div className="flex flex-col gap-y-2">

            <InvoiceSelectApplication control={control}/>
          </div>

          <div className="flex flex-col gap-y-2">
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <NumericFormat customInput={InputCustom}
                                   label={'Сумма оплаты нам'}
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
                name="amountOfPaymentToUs"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputCustom onValueChange={onChange} value={value} label={'Срок оплаты нам'}/>
                )}
                name="paymentDeadlineToUs"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <SelectPaymentMethod control={control} field={'paymentMethodToUs'}/>
          </div>
          <div className="flex flex-col gap-y-2">
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <InputDateCustom onChange={(value) => onChange(value?.toString())}
                                     value={value ? parseDate(value) : undefined} label={'Дата оплаты нам'}/>
                )}
                name="dateOfPaymentToUs"
            />
          </div>
          <div className="flex flex-col gap-y-2">

            <InvoiceSelectAccountNumber control={control}/>
          </div>
      </FormLayouts>
  );
}
