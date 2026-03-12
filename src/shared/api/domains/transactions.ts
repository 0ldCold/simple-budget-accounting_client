import { ApiClass } from '@/shared/api/apiClass.ts'
import type { AxiosInstance } from 'axios'

export class TransactionsApi extends ApiClass {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance)
  }

  public getList(): Promise<Paths.ListTransaction.Responses.$200> {
    return this.createRequest({ path: '/Transaction', method: 'get' })
  }

  public create(
    request: Paths.CreateTransaction.RequestBody,
  ): Promise<Paths.CreateTransaction.Responses.$201> {
    return this.createRequest({ path: '/Transaction', method: 'post', body: request })
  }
}
