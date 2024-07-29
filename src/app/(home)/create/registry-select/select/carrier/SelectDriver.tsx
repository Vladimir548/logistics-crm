'use client';

import {Control, Controller, FieldValues, Path} from 'react-hook-form';

import {QueryDriver} from "@/app/api/query/QueryDriver";
import Combobox from "@/components/combobox/Combobox";
import CarrierDriverCreate from "@/app/carrier/driver/_ui/CarrierDriverCreate";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";


interface ISelectCarrierContact<T extends  FieldValues> {
  control: Control<T>;
  id: number;
  field:Path<T>
}
export default function SelectDriver<T extends FieldValues>({ control, id,field }: ISelectCarrierContact<T>) {
    const send = useReactQuerySubscription({query:'update-driver', tracking:'driver'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-all-driver'})
    }, [send]);
  return (
    <div>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
            <Combobox enabled={!!id} label={'Водитель'} disabled={!id} controllerValue={value} onValueChange={onChange}
            queryKey={['get-all-driver',id]} queryFn={(pageParam,search) =>QueryDriver.getCarrierIdDriver({query:search,offset:pageParam,id:id})} nameField={'fullName'}
            addRecord={<CarrierDriverCreate id={id}/>}
            />
        )}
        name={field}
      />
    </div>
  );
}
