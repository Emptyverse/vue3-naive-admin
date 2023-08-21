import { request } from '@/utils'

export default {
  // 获取用户信息
  getUser: () => request.get('/user'),
  // 刷新token
  refreshToken: () => request.post('/auth/refreshToken', null, { noNeedTip: true }),
}
