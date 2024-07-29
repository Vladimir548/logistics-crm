'use client';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/select/Select';
import { DATASORTREGISTRY, EnumSortOrder } from '@/data/data-sorting';
import { useValueSorting } from '@/zustand/useValueSorting';
import {useCallback} from 'react';
import {SelectIcon} from "@radix-ui/react-select";
import {FaSort} from "react-icons/fa";

export default function Sorting({ field }: { field: string }) {
  const { getField, getOrder,order } = useValueSorting();

  const handleValueChange =useCallback((order: EnumSortOrder) => {
      getOrder(order);
      getField(field);
  },[field,order]);

  return (
    <div className={'flex gap-x-2  h-[20px] overflow-hidden items-center'}>
      <Select onValueChange={(value: EnumSortOrder) => handleValueChange(value)}>
        <SelectTrigger style={{
          width:10,
          height:10,
          minWidth:30,
          minHeight:20

        }} className="w-[10px] h-[30px]    ">
          <SelectIcon asChild>
            <FaSort className={'self-center text-text-dark focus:text-text'} />
          </SelectIcon>
        </SelectTrigger>
        <SelectContent className={' backdrop-blur-xl'}>
          {DATASORTREGISTRY?.map((val) => <SelectItem key={val.id} value={val.order}>{val.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}
