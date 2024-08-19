'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Control, Controller, useWatch } from 'react-hook-form';
import { IInvoice } from '@/interface/interface-invoice';
import {QueryAccountNumber} from "@/app/api/query/query-account-number";
import SelectCustom from "@/components/select/SelectCustom";
import {SelectItem} from "@/components/select/Select";

interface ISelectAccountNumber {
  control: Control<IInvoice>;
}
export default function InvoiceSelectAccountNumber({ control }: ISelectAccountNumber) {
  const { data } = useQuery({
    queryKey: ['get-all-account-number'],
    queryFn: () => QueryAccountNumber.getAll({}),
  });
  const queryClient = useQueryClient();
  const applicationId = useWatch({
    control,
    name: 'accountNumberId',
  });
  if (applicationId) {
    queryClient.invalidateQueries({
      queryKey: ['get-all-account-number'],
    });
  }
  return (
    <div>
      <div>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
              <SelectCustom
                  className={'w-[230px]'}
                  label={'Номер счета'}
                  onValueChange={onChange}
                  value={String(value)}
                     defaultValue={String(value)}
              >
                  {  data?.data.map((value) => (
                      <SelectItem  key={value.id} value={String(value.id)}>
                          {value.account}
                      </SelectItem>))}
              </SelectCustom>
          )}
          name={'accountNumberId'}
        />
      </div>
    </div>
  );
}
