<template>
  <div>
    <message-list-item v-for="msg in messageList" :key="msg.time" />
  </div>
</template>

<script>
import MessageListItem from './messageListItem.vue'

export default {
  name: 'MessageList',
  components: {
    MessageListItem
  },
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    messageList() {
      return this.messages
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

<style scoped lang = "scss">

</style>
