<template>
  <div :class="['chat-list-item', isRight ? 'float-right' : '']">
    <div>
      <div class="chat-list-item-head">
        <a-avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <div class="nick-name">nickName</div>
      </div>
      <span class="chat-list-item-message">
        jkljkljkl
      </span>
    </div>
  </div>
</template>

<script>
import { messageModel } from '@/dataModel'

export default {
  name: 'MessageListItem',
  props: {
    message: {
      type: Object,
      default: () => JSON.parse(JSON.stringify(messageModel))
    },
    isRight: {
      type: Boolean,
      default: false
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
  .chat-list-item {
    max-width: 300px;
    .chat-list-item-head {
      display: flex;
      height: 40px;
      .nick-name {
        line-height: 40px;
      }
    }
    .chat-list-item-message {
      padding: 4px 10px;
      background-color: #eee;
      border-radius: 10px;
      display: inline-block;
      margin-top: 4px;
    }
  }
</style>

