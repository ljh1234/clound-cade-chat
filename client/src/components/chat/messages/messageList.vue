<template>
  <div>
    <message-list-item v-for="msg in messageList" :key="msg.time" :is-right="msg.userId === userId" />
  </div>
</template>

<script>
import MessageListItem from './messageListItem.vue'
import { mapGetters } from 'vuex'

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
    },
    ...mapGetters(['userId'])
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
