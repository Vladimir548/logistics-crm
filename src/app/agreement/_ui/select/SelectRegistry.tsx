'use client';

import { Control, Controller } from 'react-hook-form';

import { IAgreement } from '@/interface/interface-agreement';
import { useQuery } from '@tanstack/react-query';

import SelectCustom from "@/components/select/SelectCustom";
import {SelectItem} from "@/components/select/Select";
import {QueryApplication} from "@/app/api/query/query-application";

interface ISelectRegistry {
  control: Control<IAgreement>;
}
export default function SelectRegistry({ control }: ISelectRegistry) {
  const { data } = useQuery({
    queryKey: ['get-all-application'],
    queryFn: () => QueryApplication.getAll({}),
  });
  return (
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
              <SelectCustom
                  label={'Номер заявки'}
                  onValueChange={onChange}
                  value={String(value)}
                  defaultValue={String(value)}
              >
                  { data?.data?.map(value => (
                      <SelectItem  key={value.id} value={String(value.id)}>
                          {`Заявка № ${value.applicationNumber}`}
                      </SelectItem>
                  ))}
              </SelectCustom>
          )}
          name={'applicationId'}
        />

  );
}
