interface IDataPaymentMethod {
  value: string;
  label: string;
}

export const DATAPAYMENTMETHOD: IDataPaymentMethod[] = [
  {
    value: 'WITH_NDS',
    label: 'С НДС',
  },
  {
    value: 'WITHOUT_NDS',
    label: 'Без НДС',
  },
];
