export interface PayedBills {
  totalValue: number;
  monthDate: number;
  productName: string,
  personInfos: personInfos[],
}

export interface personInfos {
  id: number;
  neighborhood: string,
  gender: string,
  birthDate: string,
}
