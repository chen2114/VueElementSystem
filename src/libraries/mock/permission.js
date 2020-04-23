import Mock from 'mockjs'
import { getPayload } from './utils/utils'
import { asyncRoutes } from '@/libraries/router/asyncRoutes'

function filterRoutes (role) {
  if (role === 'admin') {
    return JSON.stringify(asyncRoutes)
  } else {
    const arr = asyncRoutes.filter(item => item.name !== 'role')
    return JSON.stringify(arr)
  }
}

Mock.mock(RegExp('/api/user/getRoutes?.*'), 'get', options => {
  const payload = getPayload(options)
  return {
    data: JSON.parse(filterRoutes(payload.role)),
    code: 20000
  }
})

Mock.mock('/api/getRoleRoutesList', 'get', {
  data: [
    {
      role: 'admin',
      routes: JSON.parse(filterRoutes('admin'))
    },
    {
      role: 'editor',
      routes: JSON.parse(filterRoutes('editor'))
    }
  ],
  code: 20000
})
