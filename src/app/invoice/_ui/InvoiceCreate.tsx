'use client';

import { getIdUser } from '@/services/auth/auth.helper';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import {Button} from "@/components/buttons/Buttons";


export default function InvoiceCreate() {
  const idUser = getIdUser();
  const { register, handleSubmit, control, reset } = useForm<IInvoice>({
    defaultValues: {
      userId: Number(idUser),
    },
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['create-invoice'],
    mutationFn: (data: IInvoice) => QueryInvoice.create(data),
    onSuccess: async () => {
      reset();
      await queryClient.invalidateQueries({ queryKey: ['get-all-invoice'] });
      toast.success('Запиись добавлена');
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

      <form onSubmit={handleSubmit(onSubmit)} className={'p-2 w-full'}>
        <div className="flex w-full gap-2 flex-wrap">
          <div className="flex flex-col gap-y-2">
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <InputCustom  onValueChange={onChange} value={value} label={'Номер УПД'} />
                )}
                name="invoiceNumber"
            />
          </div>
          <div className="flex flex-col gap-y-2">

            <InvoiceSelectApplication control={control} />
          </div>

          <div className="flex flex-col gap-y-2">
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
            <div className="flex flex-col gap-y-2">
              <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                      <InputCustom  onValueChange={onChange} value={value} label={'Срок оплаты нам'} />
                  )}
                  name="paymentDeadlineToUs"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <SelectPaymentMethod control={control} field={'paymentMethodToUs'} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                      <InputDateCustom onChange={(value)=>onChange(value?.toString())} value={value ? parseDate(value) : undefined} label={'Дата оплаты нам'} />
                  )}
                  name="dateOfPaymentToUs"
              />
            </div>
            <div className="flex flex-col gap-y-2">

              <InvoiceSelectAccountNumber control={control} />
            </div>

        </div>
          <Button  type={'submit'} variant={'add'}>Создать</Button>
      </form>

  );
};
