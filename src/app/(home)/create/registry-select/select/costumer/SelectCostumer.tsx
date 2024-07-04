'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {Control, Controller, FieldValues, Path, useWatch} from 'react-hook-form';


import {QueryCostumer} from "@/app/api/query/QueryCostumer";
import SelectCostumerContact from "@/app/(home)/create/registry-select/select/costumer/SelectCostumerContact";
import SelectCustom from "@/components/select/SelectCustom";
import {SelectItem} from "@/components/select/Select";


interface ISelectCostumer<T extends FieldValues> {
  control: Control<T>;

  field:Path<T>
  fieldContact?: Path<T>
}
export default function SelectCostumer<T extends FieldValues>({ control, field,fieldContact }: ISelectCostumer<T>) {
  const { data, isPending } = useQuery({
    queryKey: ['get-all-costumer'],
    queryFn: () => QueryCostumer.getAll(),
  });
  const queryClient = useQueryClient();
  const costumerId = useWatch({
    control,
    name: field,
  });
  if (costumerId) {
    queryClient.invalidateQueries({
      queryKey: ['get-costumer-id-contact'],
    });
  }
  return (
    <div className={' flex flex-col gap-y-2'}>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
              <SelectCustom
                  label={'Заказчик'}
                  className={'w-[300px]'}
                  onValueChange={onChange}
                  value={value}
                  defaultValue={!isPending ? value : 'Загрузка...'}
              >
                {data?.costumers.map((value) => (
                    <SelectItem key={value.id} value={String(value.id)}>
                      {value.name}
                    </SelectItem>
                ))}
              </SelectCustom>
          )}
          name={field}
        />
      {fieldContact && (
      <SelectCostumerContact control={control} id={Number(costumerId)} field={fieldContact} />
      )}
    </div>
  );
}
