import { IconType } from 'react-icons';
import { FaRegUser, FaUser } from 'react-icons/fa';

interface ISubLink {
  id: number;
  link: string;
  label: string;
}

interface ILink {
  id: number;
  link?: string;
  label: string;
  isOpen?: boolean;
  subLink?: ISubLink[];
}

export const DATALINK: ILink[] = [
  {
    id: 0,
    link: '/',
    label: 'Реестр',
  },
  {
    id: 1,
    link: '/costumer',
    label: 'Заказчики',

    subLink: [
      {
        id: 0,
        link: '/costumer/contact',
        label: 'Контактное лицо',
      },
    ],
  },
  {
    id: 2,
    link: '/carrier',
    label: 'Перевозчики',
    subLink: [
      {
        id: 1,
        link: '/carrier/contact',
        label: 'Контактное лицо',
      },
      {
        id: 2,
        link: '/carrier/driver',
        label: 'Водители',
      },
    ],
  },
  {
    id: 3,
    link: '/account-number',
    label: 'Номер счета',
  },
  {
    id: 4,
    link: '/application',
    label: 'Заявка',
  },
  {
    id: 5,
    link: '/agreement',
    label: 'Договор',
  },
  {
    id: 6,
    link: '/invoice',
    label: 'УПД',
  },

];
