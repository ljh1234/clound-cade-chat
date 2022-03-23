import { io } from "socket.io-client"
import store from '@/store/index'

export default function connectWebSocket() {
  const socket = io.connect(`ws://${location.host}/?userId=${store.getters.userInfo.userId}`, { reconnection: true })

  socket.on('connection', () => {
    console.log('connected')
  })

  socket.on('groupMessage', (data) => {
    console.log(data)
  })


  return socket
}
