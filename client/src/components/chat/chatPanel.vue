<template>
  <a-card :title="_title" class="chat-panel">
    <a slot="extra" href="#">more</a>
    <div class="chat-wrapper">
      <div class="chat-window-wrapper">
        <chat-window />
      </div>
      <div class="chat-input-wrapper">
        <chat-input />
      </div>
    </div>
  </a-card>
</template>

<script>
import ChatInput from './chatInput.vue'
import ChatWindow from './chatWindow.vue'

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
    }
  },
  computed: {
    _title() {
      return this.title
    }
  },
  mounted() {},
  data () {
    return {
      
    }
  },
  methods: {}
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
