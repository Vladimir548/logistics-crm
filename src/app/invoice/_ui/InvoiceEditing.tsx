
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { useContextMenu } from '@/zustand/useContextMenu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
export default function InvoiceEditing() {
  const { numberInvoice } = useContextMenu();
  const { data } = useQuery({
    queryKey: ['get-number-invoice'],
    queryFn: () => QueryInvoice.getNumber(numberInvoice),
  });
  const { register, handleSubmit, control, reset } = useForm<IInvoice>({
    defaultValues: {
      ...data,
      dateOfPaymentToUs: data?.dateOfPaymentToUs.split('T')[0],
    },
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['update-invoice'],
    mutationFn: (data: IInvoice) => QueryInvoice.update(data, numberInvoice),
    onSuccess: async () => {
      toast.success('Запиись обнавлена');
      await queryClient.invalidateQueries({ queryKey: ['get-all-invoice', 'all-registry'] });
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={'m-2'}>
        <div className="flex w-full gap-2 flex-wrap">
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

        </div>
        <button
            className={
              'py-2 mt-2 px-3 border rounded-md border-yellow-500 duration-300 ease-linear hover:bg-yellow-600/40'
            }
            type={'submit'}
        >
          Редактировать
        </button>
      </form>
    </div>
  );
}
