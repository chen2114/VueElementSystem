import { httpGet } from '@/utils/request'

// 获取角色routes列表
export const getRoleRoutesList = () => {
  const url = '/getRoleRoutesList'
  return httpGet(url)
}
