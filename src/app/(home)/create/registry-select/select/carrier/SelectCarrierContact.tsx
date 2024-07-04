'use client';

import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {QueryContactCarrier} from "@/app/api/query/query-contact-carrier";
import SelectCustom from "@/components/select/SelectCustom";
import {SelectItem} from "@/components/select/Select";


interface ISelectCarrierContact<T extends FieldValues> {
  control: Control<T>;
  id: string | null;
  field:Path<T>
}
export default function SelectCarrierContact<T extends FieldValues>({ control, id,field }: ISelectCarrierContact<T>) {

    const { data,isPending } = useQuery({
    queryKey: ['get-carrier-id-contact', id],
    queryFn: () => QueryContactCarrier.getCarrierIdContact(Number(id)),
    enabled: !!id,
  });

  return (
    <div>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
            <SelectCustom className={'w-[300px]'}
                          disabled={!id}
                label={'Контактное лицо'}
                          onValueChange={onChange}
                          value={String(value)}
                          defaultValue={!isPending ? String(value) : 'Загрузка...'}
            >
                {data?.map((value) => (
                <SelectItem  key={value.id} value={String(value.id)} >
                        {value.fullName}
                </SelectItem>
                ))}
            </SelectCustom>
        )}
        name={field}
      />
    </div>
  );
}
