import { StatusOrder } from '@/interface/interface-registry';

interface IStatusOrder {
  id: number;
  label: string;
  value: StatusOrder;
}

export const DATASTATUSORDER: IStatusOrder[] = [
  {
    id: 0,
    label: 'Оплачено',
    value: StatusOrder.PAID,
  },
  {
    id: 1,
    label: 'Ожидает оплаты',
    value: StatusOrder.WAITING_PAYMENT,
  },
  {
    id: 2,
    label: 'Не оплачено',
    value: StatusOrder.NOT_PAID,
  },
];
