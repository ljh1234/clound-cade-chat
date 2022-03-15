import http from '@/utils/http'

export function getGroups(groupIds) {
  return http.post('/group/getGroups', { groupIds })
}

export function getAllGroups() {
  return http.get('/group/getAllGroups')
}
