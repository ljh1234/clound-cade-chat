import { io } from "socket.io-client"

console.log('location', location.host)
const socket = io(`ws://${location.host}`)

socket.onAny((eventName, ...args) => {
  // ...
  console.log(eventName, ...args)
})

export default socket