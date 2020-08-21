import Vue from 'vue'
import moment from 'moment'

/**
 * @filter dateFormat 时间格式化
 * @param {String, Date} value 可被 new Date 解析的字符串
 * @param {String} formatStr moment 的 format 字符串
 * 使用方法 {{ 2019-1-1 | dateFormat() }}
 */
Vue.filter('dateFormat', (value, formatStr) => {
  if (value) {
    return moment(value)
      .format(formatStr || 'YYYY年MM月DD日 HH:mm:ss')
  } else {
    return '----年--月--日'
  }
})
