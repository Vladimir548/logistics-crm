interface IDataSorting {
  id: number;
  label: string;

  order: string;
}

export enum EnumSortOrder {
  asc = 'asc',
  desc = 'desc',
}
export const DATASORTREGISTRY: IDataSorting[] = [
  {
    id: 0,
    label: 'По возврастанию',
    order: EnumSortOrder.asc,
  },
  {
    id: 1,
    label: 'По убыванию',

    order: EnumSortOrder.desc,
  },
];
