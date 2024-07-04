'use client';

import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {QueryContactCostumer} from "@/app/api/query/query-contact-costumer";
import SelectCustom from "@/components/select/SelectCustom";
import {SelectItem} from "@/components/select/Select";
import {useEffect} from "react";

interface ISelectCostumerContact<T extends FieldValues> {
  control: Control<T>;
  id: number;
  field:Path<T>
}
export default function SelectCostumerContact<T extends FieldValues>({ control, id,field }: ISelectCostumerContact<T>) {
  const { data, isPending } = useQuery({
    queryKey: ['get-costumer-id-contact', id],
    queryFn: () => QueryContactCostumer.getCostumerIdContact(id),
    enabled: !!id,
  });
  return (
    <div className={'flex flex-col gap-y-2'}>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
              <SelectCustom  className={'w-[300px]'}
                            disabled={!id}
                            label={'Контактное лицо'}
                            onValueChange={onChange}
                            value={String(value)}
                            defaultValue={String(value)}
                             isLoading={isPending}
              >
                {data?.map((value) => (
                    <SelectItem key={value.id} value={String(value.id)}>
                      {value.fullName}
                    </SelectItem>))}
              </SelectCustom>
          )}
          name={field}
        />

    </div>
  );
}
