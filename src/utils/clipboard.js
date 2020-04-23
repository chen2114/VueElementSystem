import Clipboard from 'clipboard'
import { Message } from 'element-ui'

export default function handleClipboard (text) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    Message.success('复制成功')
    // 释放内存
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    Message.error('复制失败')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
