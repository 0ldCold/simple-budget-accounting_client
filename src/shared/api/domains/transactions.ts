import { ApiClass } from '@/shared/api/apiClass.ts'
import type { AxiosInstance } from 'axios'

export class TransactionsApi extends ApiClass {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance)
  }

  public getList = (): Promise<Paths.TransactionControllerFindAll.Responses.$200> => {
    return this.createRequest({ path: '/Transaction', method: 'get' })
  }

  public create = (
    request: Paths.TransactionControllerCreate.RequestBody,
  ): Promise<Paths.TransactionControllerCreate.Responses.$201> => {
    return this.createRequest({ path: '/Transaction', method: 'post', body: request })
  }

  public edit = (
    id: Paths.TransactionControllerUpdate.Parameters.Id,
    request: Paths.TransactionControllerUpdate.RequestBody,
  ): Promise<Paths.TransactionControllerUpdate.Responses.$200> => {
    return this.createRequest({ path: `/Transaction/${id}`, method: 'put', body: request })
  }

  public delete = (
    id: Paths.TransactionControllerRemove.Parameters.Id,
  ): Promise<Paths.TransactionControllerRemove.Responses.$200> => {
    return this.createRequest({ path: `/Transaction/${id}`, method: 'delete' })
  }
}
