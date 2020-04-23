import Mock from 'mockjs'
import { getPayload } from './utils/utils'

Mock.mock('/api/logout', 'get', {
  data: [],
  message: '退出成功',
  code: 20000
})

Mock.mock(RegExp('/api/login?.*'), 'get', options => {
  const payload = getPayload(options)

  const token = {
    admin: 'admin-token',
    editor: 'editor-token'
  }

  let result = {}

  if (payload.account === 'admin') {
    result = {
      data: {
        token: token.admin
      },
      code: 20000
    }
  } else if (payload.account === 'editor') {
    result = {
      data: {
        token: token.editor
      },
      code: 20000
    }
  } else {
    result = {
      data: [],
      message: '账号密码错误',
      code: 40000
    }
  }

  return result
})

Mock.mock(RegExp('/api/user/getUserInfo?.*'), 'get', options => {
  const payload = getPayload(options)

  const token = {
    admin: 'admin-token',
    editor: 'editor-token'
  }

  let result = {}

  if (payload.token === token.admin) {
    result = {
      data: {
        role: 'admin'
      },
      code: 20000
    }
  } else if (payload.token === token.editor) {
    result = {
      data: {
        role: 'editor'
      },
      code: 20000
    }
  } else {
    result = {
      data: {},
      message: '当前用户不存在',
      code: 40000
    }
  }

  return result
})
