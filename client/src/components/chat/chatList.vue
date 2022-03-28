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
  },
  data () {
    return {
      
    }
  },
  methods: {
    handleClick({ key }) {
      this.$emit('click', key)
    }
  }
}
</script>

