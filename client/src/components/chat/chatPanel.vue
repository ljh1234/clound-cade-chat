<template>
  <a-card :title="_title" class="chat-panel">
    <a slot="extra" href="#">more</a>
    <div class="chat-wrapper">
      <div class="chat-window-wrapper">
        <chat-window :messages="messageList" />
      </div>
      <div class="chat-input-wrapper">
        <chat-input ref="chatInput" @send="handleSendMessage"  />
      </div>
    </div>
  </a-card>
</template>

<script>
import ChatInput from './chatInput.vue'
import ChatWindow from './chatWindow.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ChatPanel',
  components: {
    ChatInput,
    ChatWindow
  },
  props: {
    title: {
      type: String,
      default: '聊天室'
    },
    id: {
      type: Number,
      default: 0,
      required: true
    },
    type: {
      type: String,
      default: 'group'
    },
    defaultMessageList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    _title() {
      return this.title
    },
    ...mapGetters(['userId'])
  },
  data () {
    return {
      messageList: []
    }
  },
  methods: {
    handleSendMessage(message) {
      if (!message || !this.id) return

      if (this.type === 'group') {
        const msg = {
          userId: this.userId,
          groupId: this.id,
          messageType: 'string',
          content: message,
          time: new Date().valueOf()
        }

        // 添加到messageList
        this.messageList.push({ ...msg, isSend: false })
        const index = this.messageList.length - 1
        // 发送
        this.$ws.emit('groupMessage', msg, (info) => {
          console.log('groupMessage', info)
          this.messageList.splice(index, 1, { ...msg, isSend: true })
        })
      }
    },
    onMessage() {
      this.$ws.on('groupMessage', (info) => {
        console.log('info', info)
      })
    }
  }
}
</script>

<style scoped lang = "less">
.chat-panel {
  height: 100vh;
  /deep/ .ant-card-body {
    padding: 10px;
  }
  .chat-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    .chat-window-wrapper {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: calc(100vh - 114px);
    }
    .chat-input-wrapper {
      width: 100%;
      background: #fff;
    }
  }
  
}
</style>
