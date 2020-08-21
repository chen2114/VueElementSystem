import { httpGet } from '@/utils/request'

export function getTableData (payload) {
  const url = '/getTableData'
  return httpGet(url, payload)
}

export function getName () {
  const url = '/getName'
  return httpGet(url)
}
