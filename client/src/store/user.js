import { getLocalStorage, setLocalStorage } from '@/utils/index'

const getDefaultUserState = () => {
  return {
    userInfo: getLocalStorage('userInfo') 
    ? JSON.parse(getLocalStorage('userInfo')) : {
        nickName: '',
        userId: '',
        groupIds: '',
        avatarUrl: '',
    },
    token: getLocalStorage('token')
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
  storeUserInfo: ({ commit, dispatch }) => {
    return new Promise(() => {
      // 用户接口 获取用户信息
      console.log(commit, dispatch)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}