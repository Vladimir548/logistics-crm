'use client';

import {Control, Controller, FieldValues, Path} from 'react-hook-form';

import {QueryContactCarrier} from "@/app/api/query/query-contact-carrier";

import Combobox from "@/components/combobox/Combobox";
import CarrierContactCreate from "@/app/carrier/contact/_ui/CarrierContactCreate";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";


interface ISelectCarrierContact<T extends FieldValues> {
  control: Control<T>;
  id: number | null;
  field:Path<T>
}
export default function SelectCarrierContact<T extends FieldValues>({ control, id,field }: ISelectCarrierContact<T>) {
    const send = useReactQuerySubscription({query:'update-carrier-contact', tracking:'carrier-contact'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-all-carrier-contact'})
    }, [send]);
  return (
    <div>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
            <Combobox label={'Контактное лицо'} disabled={!id} controllerValue={value} onValueChange={onChange}
            queryKey={['get-all-carrier-contact',id]}
                      queryFn={(pageParam, search) => QueryContactCarrier.getCarrierIdContact({id:Number(id),query:search,offset:pageParam})}
                      nameField={'fullName'}
                      addRecord={<CarrierContactCreate id={Number(id)} />} enabled={!!id}

            />
        )}
        name={field}
      />
    </div>
  );
}
