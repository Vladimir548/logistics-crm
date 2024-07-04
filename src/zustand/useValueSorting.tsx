import { create } from 'zustand';
import { StatusOrder } from '@/interface/interface-registry';
import { EnumSortOrder } from '@/data/data-sorting';

interface IValueSorting {
  field: string | undefined;
  getField: (val: string) => void;
  order: EnumSortOrder;
  getOrder: (val: EnumSortOrder) => void;
}

export const useValueSorting = create<IValueSorting>()((set) => ({
  field: undefined,
  getField: (field) => set(() => ({ field: field })),
  order: EnumSortOrder.asc,
  getOrder: (val) => set(() => ({ order: val })),
}));
