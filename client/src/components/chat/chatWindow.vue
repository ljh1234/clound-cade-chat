<template>
  <div class="chat-window">
    <message-list :messages="_messages" />
  </div>
</template>

<script>
import MessageList from './messages/messageList.vue'

export default {
  name: 'ChatWindow',
  components: {
    MessageList
  },
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    _messages() {
      return this.messages
    }
  },
  data () {
    return {
      
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .chat-window {
    overflow: auto;
  }
</style>