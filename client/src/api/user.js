import http from '@/utils/http'

export function getUserInfo(userId) {
  return http.post('/user/getUserInfo', { userId })
}
