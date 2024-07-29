'use client';

import { getIdUser } from '@/services/auth/auth.helper';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorCatch } from '@/app/api/api.helper';
import { QueryInvoice } from '@/app/api/query/query-invoice';
import { IInvoice } from '@/interface/interface-invoice';
import { NumericFormat } from 'react-number-format';
import InvoiceSelectApplication from "@/app/invoice/_ui/select/InvoiceSelectApplication";
import InvoiceSelectAccountNumber from "@/app/invoice/_ui/select/InvoiceSelectAccountNumber";
import InputCustom from "@/components/input/InputCustom";
import InputDateCustom from "@/components/input/InputDateCustom";
import {parseDate} from "@internationalized/date";
import SelectPaymentMethod from "@/app/(home)/create/registry-select/select/payment-method/SelectPaymentMethod";
import FormLayouts from "@/app/layouts/FormLayouts";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";

export default function InvoiceCreate() {
  const idUser = getIdUser();
  const {  handleSubmit, control, reset } = useForm<IInvoice>({
    defaultValues: {
      userId: Number(idUser),
    },
  });
  const send = useReactQuerySubscription({query:'update-invoice', tracking:'invoice'})
  const { mutate } = useMutation({
    mutationKey: ['create-invoice'],
    mutationFn: (data: IInvoice) => QueryInvoice.create(data),
    onSuccess: async () => {
      reset();
      send({operation:'invalidate',entity:['get-all-application','get-all-registry','get-all-invoice']})
      toast.success('Запись добавлена');
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

      <FormLayouts handleFn={handleSubmit(onSubmit)} label={'Создать'} buttonVariant={'add'} >
        <div >
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <InputCustom  onValueChange={onChange} value={value} label={'Номер УПД'} />
                )}
                name="invoiceNumber"
            />
          </div>
          <div >
            <InvoiceSelectApplication control={control} />
          </div>

          <div >
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <NumericFormat customInput={InputCustom}
                  label={'Сумма оплаты нам'}
                  suffix=" ₽"
                  allowNegative
                  value={value}
                  thousandSeparator=" "
                  onValueChange={(v) =>
                    onChange({
                      type: 'text',
                      target: { value: v.value },
                    })
                  }
                />
              )}
              name="amountOfPaymentToUs"
            />
          </div>
            <div >
              <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                      <InputCustom  onValueChange={onChange} value={value} label={'Срок оплаты нам'} />
                  )}
                  name="paymentDeadlineToUs"
              />
            </div>
            <div  >
              <SelectPaymentMethod control={control} field={'paymentMethodToUs'} />
            </div>
            <div  >
              <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                      <InputDateCustom onChange={(value)=>onChange(value?.toString())} value={value ? parseDate(value) : undefined} label={'Дата оплаты нам'} />
                  )}
                  name="dateOfPaymentToUs"
              />
            </div>
            <div  >

              <InvoiceSelectAccountNumber control={control} />
            </div>
    </FormLayouts>

  );
};
