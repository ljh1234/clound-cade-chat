import { getLocalStorage, setLocalStorage } from '@/utils/index'
import { getUserInfo } from '@/api/user'

const userInfo = {
  nickName: '',
  userId: '',
  groupIds: '',
  avatarUrl: ''
}

const getDefaultUserState = () => {
  return {
    userInfo: getLocalStorage('userInfo') ? 
      JSON.parse(getLocalStorage('userInfo')) : JSON.parse(JSON.stringify(userInfo)),
    token: getLocalStorage('token'),
    chatList: getLocalStorage('chatList') ? 
      JSON.parse(getLocalStorage('chatList')) : []
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
  // getChatList: ({ commit, dispatch }) => {
  //   return new Promise(() => {

  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}