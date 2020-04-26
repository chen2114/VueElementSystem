import Mock from 'mockjs'
import mockServer from './utils/utils'

mockServer('/getTableData', 'get', payload => {
  return Mock.mock({
    'data|2-40': [
      {
        id: '@guid()',
        name: function () {
          if (payload.name === '') {
            return Mock.mock('@cname')
          } else {
            return payload.name
          }
        },
        'state|1-2': 1,
        date: '@datetime("20yy-MM-dd HH:mm:ss")',
        'count|0-100': 0
      }
    ]
  })
})

mockServer('/getName', 'get', () => {
  return Mock.mock({
    'data|1-10': [
      {
        label: '@cname',
        value: '@id'
      }
    ]
  })
})
