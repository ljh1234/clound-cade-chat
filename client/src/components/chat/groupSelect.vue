<template>
  <div>
    <a-select
      v-model="selectedGroup"
      show-search
      :placeholder="$t('groupSelect.searchGroupPlaceholder')"
      option-filter-prop="children"
      style="width: 400px"
      :filter-option="filterOption"
    >
      <a-select-option v-for="option in options" :key="option.key" :value="option.value">
        {{ option.label }}
      </a-select-option>
    </a-select>
    <a-button type="primary" @click="handleJoinGroup">{{ $t('groupSelect.joinButtonText') }}</a-button>
  </div>
  
</template>

<script>
import { getAllGroups } from '@/api/group'
import { mapGetters } from 'vuex'
import socket from '@/utils/websocket'

export default {
  name: 'GroupSelect',
  created() {
    this.getOptions()
  },
  mounted() {},
  data () {
    return {
      options: [],
      selectedGroup: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    async getOptions() {
      try {
        const data = await getAllGroups()

        console.log('data', data)
        this.options = data.groups.map(d => ({ ...d, label: d.groupName, value: d.groupId }))
        
      } catch (err) {
        //
      }
    },
    handleJoinGroup() {
      if (!this.selectedGroup) return
      try {
        socket.emit('joinGroup', {
          userId: this.userInfo.userId,
          groupId: this.selectedGroup
        }, () => {
          this.$store.dispatch('updateUserInfo')
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang = "scss">

</style>
