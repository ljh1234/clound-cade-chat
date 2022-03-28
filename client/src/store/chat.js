import { getLocalStorage, setLocalStorage } from '@/utils/index'
import { getUserInfo } from '@/api/user'
import socket from '@/utils/websocket'

const getDefaultUserState = () => {
  return {
    chatData: getLocalStorage('chatData') ? 
      JSON.parse(getLocalStorage('chatData')) : JSON.parse(JSON.stringify(userInfo)),
  }
}

const state = getDefaultUserState()

const mutations = {
  
}

const actions = {
  

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}