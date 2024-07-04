import { useQuery, useQueryClient } from '@tanstack/react-query';

import {Control, Controller, FieldValues, Path, useWatch} from 'react-hook-form';
import {QueryCarrier} from "@/app/api/query/query-carrier";
import SelectDriver from "@/app/(home)/create/registry-select/select/carrier/SelectDriver";
import SelectCarrierContact from "@/app/(home)/create/registry-select/select/carrier/SelectCarrierContact";
import SelectCustom from "@/components/select/SelectCustom";
import {SelectItem} from "@/components/select/Select";


interface ISelectCarrier<T extends FieldValues> {
  control: Control<T>;
  field:Path<T>
    fieldContact?: Path<T>
    fieldDriver?: Path<T>
}
export default function SelectCarrier<T extends  FieldValues>({ control,field,fieldContact,fieldDriver }: ISelectCarrier<T>) {
  const { data, isPending } = useQuery({
    queryKey: ['get-all-carrier'],
    queryFn: () => QueryCarrier.getAll(),
  });
  const queryClient = useQueryClient();
  const carrierId = useWatch({
    control,
    name: field,
  });
  if (carrierId) {
    queryClient.invalidateQueries({
      queryKey: ['get-carrier-id-contact', 'get-carrier-id-driver'],
    });
  }

  return (
    <div className={'flex flex-col gap-y-2'}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
            <SelectCustom
                label={'Перевозчик'}
                className={'w-[300px]'}
                onValueChange={onChange}
                value={String(value)}
                defaultValue={!isPending ? String(value) : 'Загрузка...'}
            >
                { data?.carrier.map((value) => (
                    <SelectItem  key={value.id} value={String(value.id)}>
                        {`${value.name}`}
                    </SelectItem>
                ))}
            </SelectCustom>
        )}
        name={field}
      />

        {fieldContact && (
      <SelectCarrierContact control={control} id={String(carrierId)} field={fieldContact} />
        )}
        <>
            {fieldDriver && (
      <SelectDriver control={control} id={String(carrierId)} field={fieldDriver} />
            )}
        </>
    </div>
  );
}
