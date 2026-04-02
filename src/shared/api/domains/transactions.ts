import { ApiClass } from '@/shared/api/apiClass.ts'
import type { AxiosInstance } from 'axios'

export class TransactionsApi extends ApiClass {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance)
  }

  public getList = (): Promise<Paths.ListTransaction.Responses.$200> => {
    return this.createRequest({ path: '/Transaction', method: 'get' })
  }

  public create = (
    request: Paths.CreateTransaction.RequestBody,
  ): Promise<Paths.CreateTransaction.Responses.$201> => {
    return this.createRequest({ path: '/Transaction', method: 'post', body: request })
  }

  public edit = (
    id: Paths.EditTransaction.Parameters.Id,
    request: Paths.EditTransaction.RequestBody,
  ): Promise<Paths.EditTransaction.Responses.$200> => {
    return this.createRequest({ path: `/Transaction/${id}`, method: 'put', body: request })
  }

  public delete = (
    id: Paths.DeleteTransaction.Parameters.Id,
  ): Promise<Paths.DeleteTransaction.Responses.$204> => {
    return this.createRequest({ path: `/Transaction/${id}`, method: 'delete' })
  }
}
