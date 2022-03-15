<template>
  <div>
    <a-select
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
    <a-button @click="handleJoinGroup">{{ $t('groupSelect.joinButtonText') }}</a-button>
  </div>
  
</template>

<script>
import { getAllGroups } from '@/api/group'

export default {
  name: 'GroupSelect',
  created() {
    this.getOptions()
  },
  mounted() {},
  data () {
    return {
      options: []
    }
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
    handleJoinGroup() {}
  }
}
</script>

<style scoped lang = "scss">

</style>
