import { create } from 'zustand';

interface IValueFiltersMenu {
  valueCostumer: string | undefined;
  getValueCostumer: (val: string) => void;
  valueCarrier: string | undefined;
  getValueCarrier: (val: string) => void;
}

export const useGetValueFilters = create<IValueFiltersMenu>()((set) => ({
  valueCostumer: undefined,
  getValueCostumer: (val) => set(() => ({ valueCostumer: val })),
  valueCarrier: undefined,
  getValueCarrier: (val) => set(() => ({ valueCarrier: val })),
}));
