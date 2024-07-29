'use client';

import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {QueryContactCostumer} from "@/app/api/query/query-contact-costumer";
import CostumerContactCreate from "@/app/costumer/contact/_ui/CostumerContactCreate";
import Combobox from "@/components/combobox/Combobox";
import {useReactQuerySubscription} from "@/hooks/useReactQuerySubscription";
import {useEffect} from "react";

interface ISelectCostumerContact<T extends FieldValues> {
  control: Control<T>;
  id: number;
  field:Path<T>
}
export default function SelectCostumerContact<T extends FieldValues>({ control, id,field }: ISelectCostumerContact<T>) {
    const send = useReactQuerySubscription({query:'update-contact-costumer', tracking:'contact-costumer'})
    useEffect(() => {
        send({operation:'invalidate',entity:'get-costumer-id-contact'})
    }, [send]);
  return (
    <div className={'flex flex-col gap-y-2'}>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (

              <Combobox
                  disabled={!id}
                  enabled={!!id}
                  label={'Контактное лицо'}
                  controllerValue={value}
                  onValueChange={onChange}
                  queryKey={['get-costumer-id-contact', id]}
                  queryFn={( pageParam:number,search:string)=>QueryContactCostumer.getCostumerIdContact({id:id,take:3,offset:pageParam,query:search})}
                  nameField={'fullName'} addRecord={<CostumerContactCreate id={id}/>}  />
          )}
          name={field}
        />


    </div>
  );
}
