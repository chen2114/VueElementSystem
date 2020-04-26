import qs from 'qs'
import Mock from 'mockjs'

function getPayload (options) {
  return qs.parse(options.url.split('?')[1])
}

export default function mockServer (url, type, callback) {
  Mock.mock(
    RegExp(`${process.env.VUE_APP_BASE_API}${url}?.*`),
    type = type || 'get',
    options => {
      return {
        message: 'ok',
        code: 20000,
        ...callback(getPayload(options))
      }
    }
  )
}
