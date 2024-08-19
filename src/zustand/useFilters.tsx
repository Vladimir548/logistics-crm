import { create } from 'zustand';
import {IStatusOrder} from "@/data/data-status-order";
import {StatusOrder} from "@/interface/interface-registry";

export interface IFilter{
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
  paymentFromCarrier: string;
  getPaymentFromCarrier: (payment: string) => void;
  paymentToCarrier: string;
  getPaymentToCarrier: (payment: string) => void;
  deltaFrom: string;
  getDeltaFrom: (delta: string) => void;
  deltaTo: string;
  getDeltaTo: (delta: string) => void;
  prepaymentFrom: string;
  getPrepaymentFrom: (payment: string) => void;
  prepaymentTo: string;
  getPrepaymentTo: (payment: string) => void;
  statusApplication:StatusOrder[]
  getStatusApplication:(statusApplication: StatusOrder) => void;
  statusAgreement:StatusOrder[]
  getStatusAgreement:(statusAgreement: StatusOrder) => void;
  clearPeriodFrom: () => void;
  clearPeriodTo: () => void;
  clearCostumers: () => void;
  clearCarriers: () => void;
  clearPaymentFrom: () => void;
  clearPaymentTo: () => void;
  clearDeltaFrom: () => void;
  clearDeltaTo: () => void;
  clearPaymentFromCarrier: () => void;
  clearPaymentToCarrier: () => void;
  clearPrepaymentFrom: () => void;
  clearPrepaymentTo: () => void;
  clearStatusApplication: () => void;
  clearStatusAgreement: () => void;
}

export const useFilters= create<IFilter>()((set) => ({
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
  deltaFrom: '',
  getDeltaFrom: (delta: string) => set(() => ({ deltaFrom: delta })),
  deltaTo: '',
  getDeltaTo: (delta: string) => set(() => ({ deltaTo: delta })),
  paymentFromCarrier: '',
  getPaymentFromCarrier: (paymentFrom: string) => set(() => ({ paymentFromCarrier: paymentFrom })),
  paymentToCarrier: '',
  getPaymentToCarrier: (paymentTo: string) => set(() => ({ paymentToCarrier: paymentTo })),
  prepaymentFrom: '',
  getPrepaymentFrom: (prepaymentFrom: string) => set(() => ({ prepaymentFrom: prepaymentFrom })),
  prepaymentTo: '',
  getPrepaymentTo: (prepaymentTo: string) => set(() => ({ prepaymentTo: prepaymentTo })),
  statusApplication:[],
  getStatusApplication:(status: StatusOrder) =>
      set((state) => {
        const statusList = state.statusApplication.some(val => val===status)
        if (!statusList) {
          return { ...state, statusApplication: [...state.statusApplication, status] };
        }
        else {
          return  {
            ...state,
            statusApplication:state.statusApplication.filter(val => val !== status),
          }
        }
  }),
  statusAgreement:[],
  getStatusAgreement:(status: StatusOrder) => set((state)=> {
    const statusList = state.statusAgreement.some(val => val===status)
    if (!statusList) {
      return { ...state, statusAgreement: [...state.statusAgreement, status] };

    } else {
      return  {
        ...state,
        statusAgreement:state.statusAgreement.filter(val => val !== status),
      }
    }
  }),
  clearPeriodFrom: () => set(() => ({ periodFrom: '' })),
  clearPeriodTo: () => set(() => ({ periodTo: '' })),
  clearCostumers: () => set(() => ({ costumers: [] })),
  clearCarriers: () => set(() => ({ carriers: [] })),
  clearPaymentFrom: () => set(() => ({ paymentFrom: '' })),
  clearPaymentTo: () => set(() => ({ paymentTo: '' })),
  clearDeltaFrom: () => set(() => ({ deltaFrom: '' })),
  clearDeltaTo: () => set(() => ({ deltaTo: '' })),
  clearPaymentFromCarrier: () => set(() => ({ paymentFromCarrier: '' })),
  clearPaymentToCarrier: () => set(() => ({ paymentToCarrier: '' })),
  clearPrepaymentFrom: () => set(() => ({ prepaymentFrom: '' })),
  clearPrepaymentTo: () => set(() => ({ prepaymentTo: '' })),
  clearStatusApplication: () => set(() => ({ statusApplication: [] })),
  clearStatusAgreement: () => set(() => ({ statusAgreement: [] })),
}));
