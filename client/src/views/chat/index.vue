<template>
  <div class="chat-page">
    <div class="chat-page-left">
      <a-card  :bordered="false" style="height: 100%">
        <a-avatar :size="25" slot="title" />
        <a-popover v-model="visible.groupSearchVisible" slot="extra" trigger="click">
          <group-select slot="content" />
          <a-button size="small" type="primary" shape="circle" icon="plus" />
        </a-popover>
        
        <chat-list />
      </a-card>
    </div>
    <div class="chat-page-right" >
      <chat-panel />
    </div>
  </div>
  
</template>

<script>
import ChatPanel from '@/components/chat/chatPanel.vue'
import ChatList from '@/components/chat/chatList.vue'
import GroupSelect from '@/components/chat/groupSelect'
import { getGroups } from '@/api/group'
import { mapGetters } from 'vuex'

export default {
  name: 'Chat',
  components: {
    ChatPanel,
    ChatList,
    GroupSelect
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
      chatList: [],
      visible: {
        groupSearchVisible: false
      },
      searchGroupName: ''
    }
  },
  methods: {
    async getChatList() {
      if (!this.groupIds) {
        return
      }

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

<style scoped lang = "less">
.chat-page {
  display: flex;
  .chat-page-left {
    width: 25vw;
  }
  .chat-page-right {
    width: 75vw;
  }
}
</style>