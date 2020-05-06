import Mock from 'mockjs'
import mockServer from './utils/utils'

mockServer('/getTableData', 'get', payload => {
  const result = Mock.mock({
    'data|20-100': [
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
        'count|0-100': 0,
        'childData|0-10': [
          {
            id: '@guid()',
            name: '@cname',
            'state|1-2': 1,
            date: '@datetime("20yy-MM-dd HH:mm:ss")',
            'count|0-100': 0
          }
        ]
      }
    ]
  })
  if (payload.prop === 'count') {
    switch (payload.order) {
      case 'ascending':
        result.data.sort((a, b) => {
          return a.count - b.count
        })
        break
      case 'descending':
        result.data.sort((a, b) => {
          return b.count - a.count
        })
        break
    }
  } else {
    switch (payload.order) {
      case 'ascending':
        result.data.sort((a, b) => {
          return Date.parse(a.date) - Date.parse(b.date)
        })
        break
      case 'descending':
        result.data.sort((a, b) => {
          return Date.parse(b.date) - Date.parse(a.date)
        })
        break
    }
  }
  return result
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
