'use client';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/select/Select';
import { DATASORTREGISTRY, EnumSortOrder } from '@/data/data-sorting';
import { useValueSorting } from '@/zustand/useValueSorting';
import { useState } from 'react';
import {SelectIcon} from "@radix-ui/react-select";
import {FaSort} from "react-icons/fa";

export default function Sorting({ field }: { field: string }) {
  const { getField, getOrder } = useValueSorting();
  const [initialized, setInitialized] = useState(false);
  const handleValueChange = (order: EnumSortOrder) => {
    if (!initialized) {
      getOrder(order);
      getField(field);
    }
    setInitialized(true);
  };
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
