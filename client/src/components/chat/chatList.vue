<template>
  <a-menu style="width: 100%" mode="vertical" @click="handleClick">
    <a-menu-item v-for="item in list" :key="item.groupId">
      <a-avatar />
      {{ item.groupName }}
    </a-menu-item>
  </a-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChatList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    chatList() {
      return this.list
    },
    ...mapGetters(['userId'])
  },
  mounted() {
    this.joinGroupSocket()
  },
  data () {
    return {
      
    }
  },
  methods: {
    joinGroupSocket() {
      this.list.length && this.list.forEach((item) => {
        this.$ws.emit('joinGroupSocket', { userId: this.userId, groupId: item.groupId })
      })
    },
    handleClick({ key }) {
      console.log('key', key)
      this.$emit('click', key)
    }
  }
}
</script>

