import http from '@/utils/http'

export function login(userInfo) {
  return http.post('/user/login', userInfo)
}

export function register(registerInfo) {
  return http.post('/user/register', registerInfo)
}