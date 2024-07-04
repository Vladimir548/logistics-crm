'use client';

import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import { DATAPAYMENTMETHOD } from '@/data/data-payment-method';
import SelectCustom from "@/components/select/SelectCustom";
import {SelectItem} from "@/components/select/Select";

interface ISelectPaymentMethod<T extends FieldValues> {
  control: Control<T>;
  field : Path<T>
}
export default function SelectPaymentMethod<T extends FieldValues>({ control,field }: ISelectPaymentMethod<T>) {
  return (
    <div>
      <Controller
        control={control}
        name={field}
        render={({ field: { onChange, value } }) => (
            <SelectCustom
                label={'Метод оплаты'}
                children={DATAPAYMENTMETHOD?.map((value) => (
                    <SelectItem  key={value.value} value={value.value}>
                        {value.label}
                    </SelectItem>
                ))}
                onValueChange={onChange}
                value={value}
                defaultValue={value}
            >

            </SelectCustom>
        )}

      />
    </div>
  );
}
