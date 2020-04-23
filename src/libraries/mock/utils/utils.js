import qs from 'qs'

export const getPayload = (options) => {
  return qs.parse(options.url.split('?')[1])
}
