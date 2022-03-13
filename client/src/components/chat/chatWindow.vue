<template>
  <div class="chat-window">
    <message-list />
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