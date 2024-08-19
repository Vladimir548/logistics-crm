import { StatusOrder } from '@/interface/interface-registry';

export interface IStatusOrder {
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
  {
    id: 3,
    label: 'Без статуса',
    value: StatusOrder.DEFAULT,
  },
];
