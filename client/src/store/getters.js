const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  groupIds: state => state.user.userInfo.groupIds
}

export default getters