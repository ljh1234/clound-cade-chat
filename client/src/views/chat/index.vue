<template>
  <div class="chat-page">
    <div class="chat-page-left">
      <a-card  :bordered="false" style="height: 100%">
        <a-avatar :size="25" slot="title" />
        <a-popover v-model="visible.groupSearchVisible" slot="extra" trigger="click">
          <group-select slot="content" />
          <a-button size="small" type="primary" shape="circle" icon="plus" />
        </a-popover>
        
        <chat-list :list="chatList" @click="handleChatListClick" />
      </a-card>
    </div>
    <div class="chat-page-right" >
      <template v-for="chat in chatList">
        <keep-alive :key="chat.groupId">
          <chat-panel v-if="chat.groupId === showId"  :id="chat.groupId" :title="chat.groupName" />
        </keep-alive>
      </template>
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
      loading: {
        getChatList: false
      },
      searchGroupName: '',
      showId: '',
      chatType: ''
    }
  },
  methods: {
    async getChatList() {
      if (!this.groupIds) {
        return
      }

      try {
        this.loading.getChatList = true
        const list = await getGroups(this.groupIds)

        this.chatList = list.groupInfos
      
        if (this.chatList.length > 0) {
          const defaultChatId = this.chatList[0].groupId
          this.setDefaultChatId(defaultChatId, 'group')
        }
      } catch (error) {
        //
      }
    },
    setDefaultChatId(id, type) {
      this.showId = id
      this.chatType = type
    },
    handleChatListClick(id) {
      this.showId = id
    }
  }
}
</script>

<style scoped lang = "less">
.chat-page {
  display: flex;
  .chat-page-left {
    width: 25vw;
    /deep/ .ant-card-body {
      padding: 10px 0;
    }
  }
  .chat-page-right {
    width: 75vw;
  }
}
</style>