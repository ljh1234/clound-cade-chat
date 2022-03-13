const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  groupIds: state => state.user.groupIds
}

export default getters