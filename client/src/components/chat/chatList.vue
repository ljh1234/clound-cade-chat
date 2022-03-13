<template>
  <a-list item-layout="horizontal" :data-source="chatList">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <a slot="title" href="https://www.antdv.com/">{{ item.groupName }}</a>
        <a-avatar
          slot="avatar"
        />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script>
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

