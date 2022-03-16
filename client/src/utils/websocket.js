import { io } from "socket.io-client"
import store from '@/store/index'

const socket = io(`ws://${location.host}`, { query: { userId: store.getters.userInfo.userId }})

socket.onAny((eventName, ...args) => {
  // ...
  console.log(eventName, ...args)
})

socket.connect()

export default socket