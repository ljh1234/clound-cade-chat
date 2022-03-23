const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  userId: state => state.user.userInfo.userId,
  groupIds: state => state.user.userInfo.groupIds
}

export default getters