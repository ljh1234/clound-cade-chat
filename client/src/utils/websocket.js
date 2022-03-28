import { io } from "socket.io-client"
import store from '@/store/index'

const joinGroupSocket = (userId, groupIds, socket) => {
  const groups = groupIds.split(',')

  
  Array.isArray(groups) && groups.forEach(groupId => { 
    socket. emit('joinGroupSocket', { userId, groupId })
  })

  return Promise.resolve()
}

export default function connectWebSocket() {
  const groupIds = store.getters.userInfo.groupIds
  const userId = store.getters.userId
  const socket = io.connect(`ws://${location.host}/?userId=${userId}`, { reconnection: true })
  

  socket.on('connection', () => {
    console.log('connected')
    joinGroupSocket(userId, groupIds, socket)
  })

  socket.on('groupMessage', (data) => {
    console.log(data)
  })


  return socket
}
