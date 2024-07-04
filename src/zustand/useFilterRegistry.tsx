import { create } from 'zustand';
export interface IFilterRegistry {
  periodFrom: string | undefined;
  periodTo: string | undefined;
  getPeriodFrom: (val: string) => void;
  getPeriodTo: (val: string) => void;
  costumers: number[];
  getCostumers: (costumer: number) => void;
  carriers: number[];
  getCarrier: (carrier: number) => void;
  paymentFrom: string;
  getPaymentFrom: (payment: string) => void;
  paymentTo: string;
  getPaymentTo: (payment: string) => void;
  prepaymentFrom: string;
  getPrepaymentFrom: (payment: string) => void;
  prepaymentTo: string;
  getPrepaymentTo: (payment: string) => void;
}

export const useFilterRegistry = create<IFilterRegistry>()((set) => ({
  periodFrom: '',
  getPeriodFrom: (from) => set(() => ({ periodFrom: from })),
  periodTo: '',
  getPeriodTo: (to) => set(() => ({ periodTo: to })),
  costumers: [],
  getCostumers: (costumerId: number) =>
    set((state) => {
      const costumerList = state.costumers.some((costumer) => costumer === costumerId);
      if (!costumerList) {
        return { ...state, costumers: [...state.costumers, costumerId] };
      } else {
        return {
          ...state,
          costumers: state.costumers.filter((costumer) => costumer !== costumerId),
        };
      }
    }),
  carriers: [],
  getCarrier: (carrierId: number) =>
    set((state) => {
      const carrierList = state.carriers.some((carrier) => carrier === carrierId);
      if (!carrierList) {
        return { ...state, carriers: [...state.carriers, carrierId] };
      } else {
        return {
          ...state,
          carriers: state.carriers.filter((carrier) => carrier !== carrierId),
        };
      }
    }),
  paymentFrom: '',
  getPaymentFrom: (paymentFrom: string) => set(() => ({ paymentFrom: paymentFrom })),
  paymentTo: '',
  getPaymentTo: (paymentTo: string) => set(() => ({ paymentTo: paymentTo })),
  prepaymentFrom: '',
  getPrepaymentFrom: (prepaymentFrom: string) => set(() => ({ prepaymentFrom: prepaymentFrom })),
  prepaymentTo: '',
  getPrepaymentTo: (prepaymentTo: string) => set(() => ({ prepaymentTo: prepaymentTo })),
}));
