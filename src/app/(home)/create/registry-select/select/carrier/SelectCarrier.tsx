import {  useQueryClient } from '@tanstack/react-query';

import {Control, Controller, FieldValues, Path, useWatch} from 'react-hook-form';
import {QueryCarrier} from "@/app/api/query/query-carrier";
import SelectDriver from "@/app/(home)/create/registry-select/select/carrier/SelectDriver";
import SelectCarrierContact from "@/app/(home)/create/registry-select/select/carrier/SelectCarrierContact";
import Combobox from "@/components/combobox/Combobox";
import CarrierCreate from "@/app/carrier/_ui/CarrierCreate";
import {useEffect} from "react";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";


interface ISelectCarrier<T extends FieldValues> {
  control: Control<T>;
  field:Path<T>
    fieldContact?: Path<T>
    fieldDriver?: Path<T>
}
export default function SelectCarrier<T extends  FieldValues>({ control,field,fieldContact,fieldDriver }: ISelectCarrier<T>) {
  const send = useReactQuerySubscription({query:'update-carrier', tracking:'carrier'})
  useEffect(() => {
    send({operation:'invalidate',entity:'get-all-carrier'})
  }, [send]);
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
            <Combobox label={'Перевозчик'} controllerValue={value}  onValueChange={onChange}
                     addRecord={<CarrierCreate />} queryKey={['get-all-carrier']}
                      queryFn={(pageParam, search)=>QueryCarrier.getAll({offset:pageParam,query:search})} nameField={'name'} />
        )}
        name={field}
      />

        {fieldContact && (
      <SelectCarrierContact  control={control} id={carrierId} field={fieldContact} />
        )}
        <>
            {fieldDriver && (
      <SelectDriver control={control} id={carrierId} field={fieldDriver} />
            )}
        </>
    </div>
  );
}
