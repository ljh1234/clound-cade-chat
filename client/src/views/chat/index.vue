<template>
  <div class="chat-page">
    <div class="chat-page-left">
      <chat-list />
    </div>
    <chat-panel />
  </div>
  
</template>

<script>
import ChatPanel from '@/components/chat/chatPanel.vue'
import ChatList from '@/components/chat/chatList.vue'
import { getGroups } from '@/api/group'
import { mapGetters } from 'vuex'

export default {
  name: 'Chat',
  components: {
    ChatPanel,
    ChatList
  },
  computed: {
    ...mapGetters(['groupIds'])
  },
  created() {
    this.getChatList()
  },
  mounted() {},
  data () {
    return {
      chatList: []
    }
  },
  methods: {
    async getChatList() {
      try {
        const list = await getGroups(this.groupIds)

        console.log('groupList', list)
      } catch (error) {
        //
      }
    }
  }
}
</script>
