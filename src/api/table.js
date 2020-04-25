import { httpGet } from '@/utils/request'

export function getTableData (payload) {
  const url = '/getTableData'
  return httpGet(url, payload)
}
