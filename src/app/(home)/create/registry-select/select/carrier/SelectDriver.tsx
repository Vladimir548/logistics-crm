'use client';

import {Control, Controller, FieldValues, Path} from 'react-hook-form';

import { useQuery } from '@tanstack/react-query';
import {QueryDriver} from "@/app/api/query/QueryDriver";
import SelectCustom from "@/components/select/SelectCustom";
import {SelectItem} from "@/components/select/Select";

interface ISelectCarrierContact<T extends  FieldValues> {
  control: Control<T>;
  id: string;
  field:Path<T>
}
export default function SelectDriver<T extends FieldValues>({ control, id,field }: ISelectCarrierContact<T>) {
  const { data,isPending } = useQuery({
    queryKey: ['get-carrier-id-driver', id],
    queryFn: () => QueryDriver.getCarrierIdDriver(Number(id)),
    enabled: !!id,
  });

  return (
    <div>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
            <SelectCustom className={'w-[300px]'}
                          disabled={!id}
                          label={'Водитель'}
                          onValueChange={onChange}
                          value={String(value)}
                          defaultValue={ value}
            >
                { data?.map((value) => (
                    <SelectItem  key={value.id} value={String(value.id)}  >

                             {value.fullName}


                    </SelectItem>))}
            </SelectCustom>
        )}
        name={field}
      />
    </div>
  );
}
