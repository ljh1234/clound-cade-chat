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
  SET_USER: (state, userInfo) => {
    const newUserInfo = {
      ...state.userInfo,
      ...userInfo
    }

    state.userInfo = newUserInfo
    setLocalStorage('userInfo', JSON.stringify(newUserInfo))
  },
  SET_TOKEN: (state, token) => {
    if (token) {
      setLocalStorage('token', token)
      state.token = token
    }
  }
}

const actions = {
  updateUserInfo: ({ commit }) => {
    return new Promise((resolve, reject) => {
      // 用户接口 获取用户信息
      try {
        const preUserInfo = getLocalStorage('userInfo') ? 
        JSON.parse(getLocalStorage('userInfo')) : JSON.parse(JSON.stringify(userInfo))
        
        if (!preUserInfo.userId) {
          reject()
        }

        getUserInfo(preUserInfo.userId).then((data) => {
          commit('SET_USER', data)

          resolve()
        })
      } catch (error) {
        reject(error)
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}