import Mock from 'mockjs'
import { getPayload } from './utils/utils'

Mock.mock(RegExp('/api/getTableData?.*'), 'get', options => {
  const payload = getPayload(options)

  return Mock.mock({
    'data|2-40': [
      {
        id: '@guid()',
        name: function () {
          if (payload.name === '0') {
            return Mock.mock('@cname')
          } else {
            return payload.name
          }
        },
        'state|1-2': 1,
        date: '@datetime("20yy-MM-dd HH:mm:ss")',
        'count|0-100': 0
      }
    ],
    message: 'ok',
    code: 20000
  })
})
