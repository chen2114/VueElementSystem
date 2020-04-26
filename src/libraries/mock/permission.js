import mockServer from './utils/utils'
import { asyncRoutes } from '@/libraries/router/asyncRoutes'

function filterRoutes (role) {
  if (role === 'admin') {
    return JSON.stringify(asyncRoutes)
  } else {
    const arr = asyncRoutes.filter(item => item.name !== 'role')
    return JSON.stringify(arr)
  }
}

mockServer('/user/getRoutes', 'get', payload => {
  return {
    data: JSON.parse(filterRoutes(payload.role))
  }
})

mockServer('/getRoleRoutesList', 'get', () => {
  return {
    data: [
      {
        role: 'admin',
        routes: JSON.parse(filterRoutes('admin'))
      },
      {
        role: 'editor',
        routes: JSON.parse(filterRoutes('editor'))
      }
    ]
  }
})
