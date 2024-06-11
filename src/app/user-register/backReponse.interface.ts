export interface BackReponse {
  status:number,
  message:string,
  data?: BackResponseData
}

export interface BackResponseData {
  id: number,
  cpf: string,
  name: string,
}
