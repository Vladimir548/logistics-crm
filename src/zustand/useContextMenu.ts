import { create } from 'zustand';
import { StatusOrder } from '@/interface/interface-registry';

interface IContextMenu {
  id: number;
  getId: (val: number) => void;
  statusAgreement: StatusOrder;
  getStatusAgreement: (val: StatusOrder) => void;
  statusApplication: StatusOrder;
  getStatusApplication: (val: StatusOrder) => void;
  numberApplication: string;
  getNumberApplication: (val: string) => void;
  contractAgreement: string;
  getContractAgreement: (val: string | undefined) => void;
  numberInvoice: string;
  getNumberInvoice: (val: string | undefined) => void;
}

export const useContextMenu = create<IContextMenu>()((set) => ({
  id: 0,
  getId: (id) => set(() => ({ id: id })),
  statusAgreement: StatusOrder.DEFAULT,
  getStatusAgreement: (val) => set(() => ({ statusAgreement: val })),
  statusApplication: StatusOrder.DEFAULT,
  getStatusApplication: (val) => set(() => ({ statusApplication: val })),
  numberApplication: '',
  getNumberApplication: (val) => set(() => ({ numberApplication: val })),
  contractAgreement: '',
  getContractAgreement: (val) => set(() => ({ contractAgreement: val })),
  numberInvoice: '',
  getNumberInvoice: (val) => set(() => ({ numberInvoice: val })),
}));
