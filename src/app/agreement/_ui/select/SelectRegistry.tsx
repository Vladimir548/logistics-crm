'use client';

import { Control, Controller } from 'react-hook-form';

import { IAgreement } from '@/interface/interface-agreement';
import { useQuery } from '@tanstack/react-query';
import {QueryRegistry} from "@/app/api/query/query-registry";
import SelectCustom from "@/components/select/SelectCustom";
import {SelectItem} from "@/components/select/Select";

interface ISelectRegistry {
  control: Control<IAgreement>;
}
export default function SelectRegistry({ control }: ISelectRegistry) {
  const { data,isPending } = useQuery({
    queryKey: ['get-registry-all'],
    queryFn: () => QueryRegistry.getAll(),
  });
  return (


        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
              <SelectCustom
                  label={'Номер заявки'}
                  onValueChange={onChange}
                  value={String(value)}
                  defaultValue={!isPending ? String(value) : 'Загрузка...'}
              >
                  { data?.filter(val => val.agreement === null || undefined || '').map(value => (
                      <SelectItem  key={value.id} value={String(value.id)}>
                                 {`Заявка № ${value.application.applicationNumber}`}
                             </SelectItem>
                  ))}

                  {/*{data?.filter(val => val.agreement === null || undefined || '').map((value) => (*/}
                  {/*    <SelectItem  key={value.id} value={String(value.id)}>*/}
                  {/*        {`Заявка № ${value.application.applicationNumber}`}*/}
                  {/*    </SelectItem>*/}
                  {/*))}*/}
              </SelectCustom>
          )}
          name={'registryId'}
        />

  );
}
