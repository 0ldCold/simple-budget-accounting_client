import type { AxiosInstance, AxiosRequestConfig } from 'axios'

interface ICreateRequestParams<TData = unknown> {
  path: string
  method: 'get' | 'post' | 'put' | 'delete'
  body?: TData
  options?: AxiosRequestConfig<TData>
}

export class ApiClass {
  instance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.instance = axiosInstance
  }

  protected createRequestRaw<TData>({ path, method, body, options }: ICreateRequestParams<TData>) {
    if (method === 'get' || method === 'delete') {
      return this.instance[method](path, options)
    }
    return this.instance[method](path, body, options)
  }

  protected async createRequest<TData>(params: ICreateRequestParams<TData>) {
    const res = await this.createRequestRaw<TData>(params)
    return res.data
  }
}
