<template>
  <a-input-search v-model="msg" size="large" @pressEnter="handleSend" @search="handleSend">
    <a-button type="primary" slot="enterButton">
      {{ $t('sendButtonText') }}
    </a-button>
  </a-input-search>
</template>

<script>
export default {
  name: 'ChatInput',
  mounted() {},
  data () {
    return {
      msg: '',
      sendLoading: false
    }
  },
  methods: {
    handleSend() {
      if (!this.msg) this.$message.warnning(`${this.$t('cannotSendEmptyMessage')}`)
      this.sendLoading = true
      this.$emit('send', this.msg)
    },
    clearMsg() {
      this.msg = ''
    },
    disLoading() {
      this.sendLoading = false
    }
  }
}
</script>
