import axios from 'axios'

const backendHost = import.meta.env.VITE_BACKEND_HOST
if (typeof backendHost !== 'string') {
  throw new Error('Не найден хост бэка в .env файле. Проверьте .env файл или прочитайте ReadMe')
}

export const instance = axios.create({
  baseURL: backendHost,
})
