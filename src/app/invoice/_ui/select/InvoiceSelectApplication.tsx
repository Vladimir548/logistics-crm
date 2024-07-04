'use client';

import { Control, Controller } from 'react-hook-form';

import { useQuery } from '@tanstack/react-query';

import { IInvoice } from '@/interface/interface-invoice';
import {QueryApplication} from "@/app/api/query/query-application";
import SelectCustom from "@/components/select/SelectCustom";
import {SelectItem} from "@/components/select/Select";

interface ISelectApplication {
  control: Control<IInvoice>;
}
export default function InvoiceSelectApplication({ control }: ISelectApplication) {
  const { data,isPending } = useQuery({
    queryKey: ['get-all-applications'],
    queryFn: () => QueryApplication.getAll(),
  });
  return (
    <div>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
            <SelectCustom
                label={'Номер заявки'}
                onValueChange={onChange}
                value={String(value)}
                defaultValue={!isPending ? String(value) : 'Загрузка...'}
            >
                {data?.map((value) => (
                    <SelectItem key={value.id} value={String(value.id)}>
                        {`Заявка № ${value.applicationNumber}`}
                    </SelectItem>))}
            </SelectCustom>
        )}
        name={'applicationId'}
      />
    </div>
  );
}
